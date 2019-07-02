import { Injectable } from '@angular/core'
import { TranslateService, LangChangeEvent } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as moment from 'moment';

export function translateFactory(translate: TranslateService) {

  let lang = localStorage.getItem('lang')

  if (!lang) {
    lang = translate.getBrowserLang()
    localStorage.setItem('lang', lang)
  }

  translate.use(lang)
  return new LanguageService(translate)
}


// @Injectable({
//   providedIn: 'root',
//   useFactory: (translate: TranslateService) => {

//     let lang = localStorage.getItem('lang')

//     if (!lang) {
//       lang = translate.getBrowserLang()
//       localStorage.setItem('lang', lang)
//     }

//     translate.use(lang)
//     return new LanguageService(translate)
//   },
//   deps: [TranslateService]
// })

@Injectable({
  providedIn: 'root',
  useFactory: translateFactory,
  deps: [TranslateService]
})
export class LanguageService {
  lang: any
  browserLang: any
  public currentLang$: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(private translate: TranslateService) {
    this.useLang(this.translate.defaultLang)
  }

  useLang(language: string) {
    this.lang = language;
    moment.locale(this.lang);
    this.currentLang$.next(this.lang);
    this.translate.use(language);
    localStorage.setItem('lang', language);
  }

  setupLanguages(): void {

    this.translate.setTranslation('de', {
      HELLO: 'Funktioniert wie sau :DDDD',
      LANG_DE: 'Deutsch',
      LANG_EN: 'Englisch',
      LANGUAGES: 'Sprache',
      CHOOSE_DATE: 'Datum auswählen'
    });

    this.translate.setTranslation('en', {
      HELLO: 'Works like a charme :DDDD',
      LANG_DE: 'German',
      LANG_EN: 'English',
      LANGUAGES: 'Language',
      CHOOSE_DATE: 'Select date'
    });
  }

  getCurrentLang(): string {
    var result = this.lang;
    return result;
  }
}
