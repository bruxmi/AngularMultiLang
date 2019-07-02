import { Component } from '@angular/core';
import { LanguageService } from './core/services/language.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Enpure';
  selectedDate: Date;
  currentLang: string;

  constructor(private languageService: LanguageService,
    private httpClient: HttpClient) {
    this.languageService.setupLanguages();
    this.selectedDate = new Date(2018,1,1);

    this.languageService.currentLang$.subscribe(a => {
      this.currentLang = a.toUpperCase();
    });

    this.callServer().subscribe(
      (result) => console.log("succesful server call"),
      (error) => console.log("error while server call"),
    );
  }

  callServer(): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    var result = this.httpClient.get<string>("api/values", { headers: headers, responseType: 'text' as 'json' })
    return result;
  }
}
