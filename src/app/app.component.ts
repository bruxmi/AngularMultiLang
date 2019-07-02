import { Component } from '@angular/core';
import { LanguageService } from './core/services/language.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
  name: 'safeHtml'
})
export class SafeHtml implements PipeTransform {

  constructor(private sanitizer:DomSanitizer){}

  transform(html) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Enpure';
  selectedDate: Date;
  currentLang: string;
  imageBlobUrl: string | ArrayBuffer;

  constructor(private languageService: LanguageService,
    private httpClient: HttpClient) {
    this.languageService.setupLanguages();
    this.selectedDate = new Date(2018, 1, 1);

    this.languageService.currentLang$.subscribe(a => { this.currentLang = a.toUpperCase(); });
    this.getBlobThumbnail().subscribe((response: string) => {
      var tmp = response;
      //this.imageBlobUrl = "data:image/png;base64," +tmp;
      this.imageBlobUrl = tmp;
    })
  }

  getBlobThumbnail(): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var result = this.httpClient.get<string>("api/values", { headers: headers, responseType: 'text' as 'json' })
    return result;
  }
}
