import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ToolListComponent } from './features/ai-tools/components/tool-list/tool-list.component';
import { ToolExecuteComponent } from './features/ai-tools/components/tool-execute/tool-execute.component';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { BlogHomeComponent } from './features/blog/components/blog-home/blog-home.component';
import { BlogPostComponent } from './features/blog/components/blog-post/blog-post.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'tools/ai-tool-list', pathMatch: 'full' },
      { path: 'tools', component: BlogHomeComponent },
      { path: 'tools/ai-tool-list', component: ToolListComponent },
      { path: 'tools/ai-tool/:toolId', component: ToolExecuteComponent },
      { path: 'blog', component: BlogHomeComponent }, // Explicit route for Generate Blog
      { path: 'blog/:subject', component: BlogPostComponent },
      { path: 'blog/:subject/:category', component: BlogPostComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: '**', redirectTo: 'tools/ai-tool-list' },
    ],
  },
];