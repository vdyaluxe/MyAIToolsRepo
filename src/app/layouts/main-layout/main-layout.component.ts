import { Component, OnInit, ElementRef, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AI_TOOLS } from '../../features/ai-tools/ai-tools-data';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  theme: string = 'light';
  currentRoute: string = '';
  showShareOptions = false;
  currentUrl = '';
  showDropdown = false;
  toolCategories = Array.from(new Set(AI_TOOLS.map(tool => tool.category)));
  selectedCategory: string | null = null; // Track selected category

  private router = inject(Router);
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  constructor() {}

  ngOnInit() {
    this.loadTheme();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
        this.currentUrl = window.location.href;
        this.showShareOptions = false;
        this.showDropdown = false;
      });

    window.addEventListener('scroll', () => {
      const header = document.querySelector('.app-header');
      if (window.scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    });
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme) {
      this.theme = savedTheme;
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  isBlogPage(): boolean {
    return this.currentRoute.startsWith('/blog/');
  }

  shareBlog() {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          text: 'Check out this blog on TextCraft AI!',
          url: window.location.href,
        })
        .then(() => console.log('Blog shared successfully'))
        .catch((error) => console.error('Error sharing blog:', error));
    } else {
      this.toggleShareOptions();
    }
  }

  toggleShareOptions() {
    this.showShareOptions = !this.showShareOptions;
  }

  copyLink() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert('Link copied to clipboard!');
        this.showShareOptions = false;
      })
      .catch((error) => console.error('Error copying link:', error));
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectCategory(category: string | null) {
    this.selectedCategory = category;
    this.showDropdown = false; // Close dropdown after selection
    this.router.navigate(['/tools/ai-tool-list'], { queryParams: { category: category || undefined } });
  }
}