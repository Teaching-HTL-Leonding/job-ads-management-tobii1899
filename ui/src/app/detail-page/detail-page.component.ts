import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jobs, WebAPIService } from '../web-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css'
})
export class DetailPageComponent {
  allTranslations = signal<jobs>({id: 0, title: '', textEN: '', translations: [{ language: '', translatedText: '' }]});
  newLanguage: string = '';
  newTranslatedText: string = '';

  constructor(private route: ActivatedRoute, private webAPIService: WebAPIService) {};

  async ngOnInit(): Promise<void> {
    const jobId = this.route.snapshot.params['id'];
    const jobResponse = await this.webAPIService.getJobById(jobId);
    this.allTranslations.set(jobResponse);
  }

  async save() {
    await this.webAPIService.changeJobAd(this.allTranslations().id,
                                  this.allTranslations().title,
                                  this.allTranslations().textEN);

    this.ngOnInit();
  }

  async addTranslation() {
    await this.webAPIService.addTranslation(this.allTranslations().id,
                                    this.newLanguage,
                                    this.newTranslatedText);

    const language = document.getElementById('new-lang') as HTMLInputElement;
    const translation = document.getElementById('new-trans') as HTMLInputElement;

    language.value = '';
    translation.value = '';

    this.ngOnInit();
  }

  async removeTranslation(translation: jobs["translations"][0]) {
    console.log(translation);
    //await this.webAPIService.deleteTranslation(translation.id, translation.language);
    this.ngOnInit();
  }
}
