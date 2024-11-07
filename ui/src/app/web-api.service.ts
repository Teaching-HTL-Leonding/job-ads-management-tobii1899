import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';

export type jobs = {
  "id": number,
  "title": string,
  "textEN": string,
  "translations": [
      {
        "language": string,
        "translatedText": string
      }
    ]
}


@Injectable({
  providedIn: 'root'
})
export class WebAPIService{
  private httpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000';

  getJobs(): Promise<jobs[]> {
    return firstValueFrom(this.httpClient.get<jobs[]>(`${this.baseUrl}/ads`));
  }

  delete(id: number): Promise<void> {
    return firstValueFrom(this.httpClient.delete<void>(`${this.baseUrl}/ads/${id}`));
  }

  getJobById(id: number): Promise<jobs> {
    return firstValueFrom(this.httpClient.get<jobs>(`${this.baseUrl}/ads/${id}`));
  }

  changeJobAd(id: number, title: string, textEN: string) {
    return firstValueFrom(this.httpClient.patch(`${this.baseUrl}/ads/${id}`, {title, textEN}));
  }

  addTranslation(id: number, language: string, translatedText: string) {
    return firstValueFrom(this.httpClient.put(`${this.baseUrl}/ads/${id}/translations/${language}`, {language, translatedText}));
  }

  deleteTranslation(id: number, translation: string) {
    return firstValueFrom(this.httpClient.delete(`${this.baseUrl}/ads/${id}/translations/${translation}`));
  }
}
