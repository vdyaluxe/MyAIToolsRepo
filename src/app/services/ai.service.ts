import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  generateBlogContent(subject: string, affiliateLink: string): Observable<string> {
    return this.http
      .post<{ content: string }>(`${this.apiUrl}/generate-blog`, { subject, affiliateLink })
      .pipe(
        map(response => response.content),
        catchError(() => of('<p>Error generating blog content.</p>'))
      );
  }

  getTrendingTopics(): Observable<string[]> {
    return this.http
      .get<{ topics: string[] }>(`${this.apiUrl}/trending-topics`)
      .pipe(
        map(response => response.topics),
        catchError(() => of([]))
      );
  }

  getSearchSuggestions(query: string): Observable<string[]> {
    return this.http
      .post<{ suggestions: string[] }>(`${this.apiUrl}/search-suggestions`, { query })
      .pipe(
        map(response => response.suggestions),
        catchError(() => of([]))
      );
  }

  getTagsForTopic(subject: string): Observable<string[]> {
    return this.http
      .post<{ tags: string[] }>(`${this.apiUrl}/tags-for-topic`, { subject })
      .pipe(
        map(response => response.tags),
        catchError(() => of([]))
      );
  }

  getFallbackPixabayImage(prompt: string): Observable<string> {
    return this.http
      .post<{ imageUrl: string }>(`${this.apiUrl}/generate-image`, { prompt })
      .pipe(
        map(response => response.imageUrl),
        catchError(() => of(''))
      );
  }

  generateAffiliateLink(category: string): string {
    return `https://www.amazon.com/s?k=${encodeURIComponent(category)}&tag=${environment.affiliateTag}`;
  }
}