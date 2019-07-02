import { Component } from '@angular/core';
import { LanguageService } from './core/services/language.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
defineLocale('de', deLocale); 

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
    private bsLocalService: BsLocaleService) {
    this.languageService.setupLanguages();
    this.selectedDate = new Date(2018,1,1);

    this.languageService.currentLang$.subscribe(a => {
      this.currentLang = a.toUpperCase();
      this.bsLocalService.use(this.currentLang);
    })
  }
}
