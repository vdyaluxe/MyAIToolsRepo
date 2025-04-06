import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  promptTemplate?: string
}

@Injectable({
  providedIn: 'root',
})
export class AiService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  executeTextTool(prompt: string, model: string = 'gpt-4o-mini', maxTokens: number = 500, tool?: Tool): Observable<string> {
    const body = {
      prompt,
      model,
      maxTokens,
      tool: {
        id: tool?.id,
        name: tool?.name,
        description: tool?.description,
        promptTemplate: tool?.promptTemplate,
      },
    };
    return this.http
      .post<{ content: string }>(`${this.apiUrl}/execute-text`, body)
      .pipe(
        map(response => response.content || 'No response.'),
        catchError(() => of('Error executing text tool.'))
      );
  }

  generateBlogContent(subject: string, affiliateLink: string): Observable<string> {
    const prompt = `Write a modern, engaging, SEO-friendly blog article about "${subject}". Include valuable insights and naturally mention this product: ${affiliateLink}. Use HTML formatting like <p>, <h2>, <a>, etc. Structure the article with clear sections, each with a titled heading (e.g., <h2>Section Title</h2>) followed by its content. Do not include <!DOCTYPE html>, <html>, <head>, or <body> tags—just the article content starting with an <h2> heading.`;
    return this.executeTextTool(prompt, 'gpt-4o-mini', 1000);
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
    if (!query || query.length < 3) return of([]);
    return this.http
      .post<{ suggestions: string[] }>(`${this.apiUrl}/search-suggestions`, { query })
      .pipe(
        map(response => response.suggestions),
        catchError(() => of([]))
      );
  }

  getTagsForTopic(subject: string): Observable<string[]> {
    if (!subject) return of([]);
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

  // Retain dynamic prompt suggestions method
  getSuggestedPrompts(response: string, toolId: string, tool?: Tool): Observable<string[]> {
    if (!response || !toolId) return of([]);
    const requestBody = {
      response,
      toolId,
      tool,
    };
    return this.http
      .post<{ suggestions: string[] }>(`${this.apiUrl}/suggest-prompts`, requestBody)
      .pipe(
        map(result => result.suggestions || []),
        catchError(() => of([]))
      );
  }
}