import { Routes } from '@angular/router';
import { ToolListComponent } from './components/tool-list/tool-list.component';
import { ToolExecuteComponent } from './components/tool-execute/tool-execute.component';
import { BlogHomeComponent } from '../blog/components/blog-home/blog-home.component';
import { BlogPostComponent } from '../blog/components/blog-post/blog-post.component';

export const aiToolsRoutes: Routes = [
  { path: '', component: BlogHomeComponent },
  { path: 'ai-tool-list', component: ToolListComponent },
  { path: 'ai-tool/:toolId', component: ToolExecuteComponent },
  { path: 'blog/:subject', component: BlogPostComponent },
  { path: 'blog/:subject/:category', component: BlogPostComponent },
];