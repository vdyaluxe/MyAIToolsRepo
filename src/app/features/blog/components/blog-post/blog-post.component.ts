import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { tap, finalize } from 'rxjs/operators';
import nlp from 'compromise';
import { SafeHtmlPipe } from '../../../../core/utils/safe-html.pipe';
import { AiService } from '../../../../core/services/ai.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private aiService = inject(AiService);
  private meta = inject(Meta);

  loading = signal(false);
  tags: WritableSignal<string[]> = signal([]);
  subject: WritableSignal<string> = signal('');
  affiliateLink: WritableSignal<string> = signal('');
  blogContent: WritableSignal<string> = signal('');
  images: WritableSignal<string[]> = signal([]);
  mixedContent: WritableSignal<
    (string | { image: string; loading?: boolean; prompt?: string } | { affiliate: true })[]
  > = signal([]);
  readTime = signal(0);
  showBackToTop = signal(false);
  // Fallback image URL
  private readonly fallbackImage = 'https://via.placeholder.com/800x400?text=Image+Not+Available';

  ngOnInit(): void {
    if (this.subject() && this.blogContent()) return;

    const subject = this.route.snapshot.paramMap.get('subject') || 'Trending Topic';
    const category = this.route.snapshot.paramMap.get('category') || subject;
    const affiliateLink = this.aiService.generateAffiliateLink(category);

    this.subject.set(subject);
    this.affiliateLink.set(affiliateLink);
    this.titleService.setTitle(subject);

    this.loadDynamicContent(subject, affiliateLink);

    // Detect scroll for back-to-top button
    window.addEventListener('scroll', () => {
      this.showBackToTop.set(window.scrollY > 300);
    });
  }

  loadDynamicContent(subject: string, affiliateLink: string): void {
    this.loading.set(true);

    this.aiService
      .generateBlogContent(subject, affiliateLink)
      .pipe(
        tap(content => {
          content = this.sanitizeLinks(content);
          this.blogContent.set(content);

          // Parse the content into sections based on <h2> headings
          const sections = this.parseBlogSections(content);
          const combinedContent: (string | { image: string; loading?: boolean; prompt?: string } | {
            affiliate: true;
          })[] = [];

          for (const section of sections) {
            // Add the section content (title + paragraphs)
            combinedContent.push(section.content);
            // Add an affiliate link after the section
            combinedContent.push({ affiliate: true });

            // Generate an image search query and fetch the image
            const imageSearchQuery = this.extractImageSearchQuery(section);
            const imageBlock = { image: '', loading: true, prompt: section.title };
            combinedContent.push(imageBlock);
            this.mixedContent.set([...combinedContent]);

            this.fetchImageWithFallback(imageBlock, combinedContent, imageSearchQuery);
          }

          this.mixedContent.set([...combinedContent]);
          this.updateMetaData(sections, subject, combinedContent);

          // Calculate read time after content is loaded
          const wordCount = this.mixedContent()
            .filter(this.isString)
            .join(' ')
            .split(/\s+/).length;
          const minutes = Math.ceil(wordCount / 200);
          this.readTime.set(minutes);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe();
  }

  private parseBlogSections(content: string): { title: string; content: string }[] {
    // Split content by <h2> tags to identify sections
    const sectionRegex = /<h2>(.*?)<\/h2>(.*?)(?=<h2>|(?=$))/gs;
    const sections: { title: string; content: string }[] = [];
    let match;

    while ((match = sectionRegex.exec(content)) !== null) {
      const title = match[1].trim();
      const sectionContent = match[2].trim();
      sections.push({
        title,
        content: `<h2>${title}</h2>${sectionContent}`,
      });
    }

    // If no sections are found, treat the whole content as one section with a default title
    if (sections.length === 0) {
      sections.push({
        title: this.subject(),
        content: content,
      });
    }

    return sections;
  }

  private extractImageSearchQuery(section: { content: string }): string {
    const contentText = section.content
      .replace(/<h2>.*?<\/h2>/g, '') // Remove the title
      .replace(/<[^>]+>/g, '') // Remove all other HTML tags
      .trim();

    // Use compromise to extract nouns and topics
    const doc = nlp(contentText);
    const keywords = doc.nouns().out('array').slice(0, 3); // Take up to 3 nouns

    const searchQuery = keywords.join(' ').trim().toLowerCase();

    // If no keywords are found, fall back to the subject
    return searchQuery || this.subject().toLowerCase();
  }

  private fetchImageWithFallback(
    imageBlock: { image: string; loading?: boolean; prompt?: string },
    combinedContent: any[],
    imageSearchQuery: string
  ): void {
    this.aiService.getFallbackPixabayImage(imageSearchQuery).subscribe({
      next: (image) => {
        const index = combinedContent.indexOf(imageBlock);
        if (index !== -1) {
          if (image) {
            combinedContent[index] = { image, loading: false, prompt: imageBlock.prompt };
            if (!combinedContent[index + 1]?.affiliate) {
              combinedContent.splice(index + 1, 0, { affiliate: true });
            }
          } else {
            // Use fallback image if no image is returned
            combinedContent[index] = { image: this.fallbackImage, loading: false, prompt: imageBlock.prompt };
          }
          this.mixedContent.set([...combinedContent]);
        }
      },
      error: (err) => {
        console.warn(`Image fetch failed for "${imageSearchQuery}":`, err);
        const index = combinedContent.indexOf(imageBlock);
        if (index !== -1) {
          // Use fallback image on error
          combinedContent[index] = { image: this.fallbackImage, loading: false, prompt: imageBlock.prompt };
          this.mixedContent.set([...combinedContent]);
        }
      },
    });
  }

  private updateMetaData(sections: { title: string; content: string }[], subject: string, combinedContent: any[]): void {
    const intro = sections[0]?.content.replace(/<[^>]+>/g, '').slice(0, 160) || '';
    this.aiService.getTagsForTopic(subject).subscribe(tags => {
      this.tags.set(tags);

      const firstImage = combinedContent.find(
        (b) => this.isImageBlock(b) && b.image && !b.loading
      ) as { image: string } | undefined;
      this.setMetaTags(subject, intro, tags, firstImage?.image || '');
    });
  }

  sanitizeLinks(html: string): string {
    return html.replace(
      /<a\s+(?![^>]*target=)[^>]*href="([^"]+)"[^>]*>/g,
      (match) => match.replace(`<a `, `<a target="_blank" rel="noopener noreferrer" `)
    );
  }

  isString(value: unknown): value is string {
    return typeof value === 'string';
  }

  isImageBlock(val: unknown): val is { image: string; loading?: boolean; prompt?: string } {
    return typeof val === 'object' && val !== null && 'image' in val;
  }

  isAffiliateBlock(val: unknown): val is { affiliate: true } {
    return typeof val === 'object' && val !== null && 'affiliate' in val;
  }

  onImageLoad(event: Event): void {
    (event.target as HTMLImageElement).classList.add('loaded');
  }

  handleImageError(block: { image: string; loading?: boolean; prompt?: string }): void {
    block.image = this.fallbackImage;
    this.mixedContent.set([...this.mixedContent()]);
  }

  private setMetaTags(subject: string, description: string, keywords: string[], imageUrl: string): void {
    this.titleService.setTitle(subject);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords.join(', ') });
    this.meta.updateTag({ property: 'og:title', content: subject });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: subject });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
  }

  downloadFile(filename: string, content: string, mime: string): void {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  exportAsHtml(): void {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>${this.subject()}</title>
        </head>
        <body>
          <h1>${this.subject()}</h1>
          ${this.mixedContent()
            .map(block =>
              this.isString(block)
                ? block
                : this.isImageBlock(block) && !block.loading && block.image
                ? `<img src="${block.image}" alt="Related visual for ${block.prompt}" />`
                : this.isAffiliateBlock(block)
                ? `<p><a href="${this.affiliateLink()}" target="_blank">${this.affiliateLink()}</a></p>`
                : ''
            )
            .join('')}
        </body>
      </html>
    `;
    this.downloadFile(`${this.subject().replace(/\s+/g, '_')}.html`, html, 'text/html');
  }

  exportAsMarkdown(): void {
    const markdown = `# ${this.subject()}\n\n${this.mixedContent()
      .map(block =>
        this.isString(block)
          ? block.replace(/<[^>]*>/g, '')
          : this.isImageBlock(block) && !block.loading && block.image
          ? `![Related visual for ${block.prompt}](${block.image})`
          : this.isAffiliateBlock(block)
          ? `[Affiliate Link](${this.affiliateLink()})`
          : ''
      )
      .join('\n\n')}`;
    this.downloadFile(`${this.subject().replace(/\s+/g, '_')}.md`, markdown, 'text/markdown');
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}