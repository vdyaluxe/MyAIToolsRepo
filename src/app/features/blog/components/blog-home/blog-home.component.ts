import { Component, OnInit, OnDestroy, ElementRef, Renderer2, inject } from '@angular/core';
import { Router, RouterLink, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { Subject, debounceTime, switchMap, takeUntil } from 'rxjs';
import { AiService } from '../../../../core/services/ai.service';

@Component({
  selector: 'app-blog-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.scss'],
})
export class BlogHomeComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private aiService = inject(AiService);
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);
  private route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  searchQuery = '';
  suggestions = signal<string[]>([]);
  trending = signal<string[]>([]);
  loading = signal(false);
  recentBlogs = signal<{ subject: string }[]>([]);

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(500),
        switchMap(query => this.aiService.getSearchSuggestions(query)),
        takeUntil(this.destroy$)
      )
      .subscribe(suggestions => {
        this.suggestions.set(suggestions);
      });
  }

  ngOnInit() {
    this.loadTrending();
    this.loadRecentBlogs();
    this.setupOutsideClickListener();

    // Check if navigated to /blog and focus the search input
    if (this.router.url === '/blog') {
      const input = this.el.nativeElement.querySelector('input');
      if (input) {
        this.renderer.selectRootElement(input).focus();
        this.searchQuery = '';
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTrending() {
    this.loading.set(true);
    this.aiService.getTrendingTopics().pipe(takeUntil(this.destroy$)).subscribe({
      next: (topics) => {
        this.trending.set(topics);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading trending topics:', err);
        this.trending.set([]);
        this.loading.set(false);
      },
    });
  }

  onSearchInput(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery = query;
    this.searchSubject.next(query);
  }

  useSuggestion(suggestion: string) {
    this.searchQuery = suggestion;
    this.suggestions.set([]);
    this.search();
  }

  search() {
    if (!this.searchQuery) return;
    const recent = this.recentBlogs();
    recent.unshift({ subject: this.searchQuery });
    if (recent.length > 5) recent.pop();
    localStorage.setItem('recentBlogs', JSON.stringify(recent));
    this.recentBlogs.set(recent);
    this.router.navigate(['/blog', this.searchQuery]);
  }

  openTrending(topic: string) {
    this.searchQuery = topic;
    this.search();
  }

  openRecent(subject: string) {
    this.router.navigate(['/blog', subject]);
  }

  loadRecentBlogs() {
    const recent = JSON.parse(localStorage.getItem('recentBlogs') || '[]');
    recent && this.recentBlogs.set(recent);
  }

  private setupOutsideClickListener() {
    this.renderer.listen('document', 'click', (event: Event) => {
      const suggestionBox = this.el.nativeElement.querySelector('.suggestion-box');
      const inputBox = this.el.nativeElement.querySelector('input');

      if (
        suggestionBox &&
        !suggestionBox.contains(event.target) &&
        inputBox &&
        !inputBox.contains(event.target)
      ) {
        this.suggestions.set([]);
      }
    });
  }
}