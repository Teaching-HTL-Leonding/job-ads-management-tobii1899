import { Component, inject, OnInit, signal } from '@angular/core';
import { jobs, WebAPIService } from '../web-api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {
  allJobAds = signal<jobs[]>([]);

  constructor(private router: Router, private webAPIService: WebAPIService) {}

  async ngOnInit(): Promise<void> {
    const jobResponse = await this.webAPIService.getJobs();
    this.allJobAds.set(jobResponse);
  }

  delete(id: number) {
    this.webAPIService.delete(id);
    this.ngOnInit();
  }

  navigateToDetail(jobId: number): void {
    this.router.navigate(['/detail-page', jobId]);
  }
}
