import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AI_TOOLS } from '../../ai-tools-data';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-tool-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.scss'],
})
export class ToolListComponent implements OnInit {
  tools = signal<Tool[]>([]);
  categories = signal<string[]>([]);
  selectedCategory = signal<string | null>(null);
  allTools = signal<Tool[]>([]);

  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.loadTools();
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      this.selectedCategory.set(category || null);
      this.filterByCategory(category || null);
    });
  }

  loadTools() {
    this.allTools.set(AI_TOOLS);
    this.tools.set(AI_TOOLS);
    const categories = Array.from(new Set(AI_TOOLS.map(tool => tool.category)));
    this.categories.set(categories);
  }

  filterByCategory(category: string | null) {
    this.selectedCategory.set(category);
    if (category === null) {
      this.tools.set(this.allTools());
    } else {
      const filtered = this.allTools().filter(tool => tool.category === category);
      this.tools.set(filtered);
    }
  }
}