import { Routes } from '@angular/router';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';

export const blogRoutes: Routes = [
  { path: '', component: BlogHomeComponent },
  { path: ':subject', component: BlogPostComponent }
];