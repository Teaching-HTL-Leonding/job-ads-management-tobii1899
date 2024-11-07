import { Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { DetailPageComponent } from './detail-page/detail-page.component';

export const routes: Routes = [
  { path: 'jobs', component: JobsComponent },
  { path: 'detail-page/:id', component: DetailPageComponent }
];
