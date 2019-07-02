import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, SafeHtml } from './app.component';
import { TranslateModule, TranslateLoader, TranslateService,} from '@ngx-translate/core';
import { of, Observable } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';

import { CoreModule } from './core/core.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
registerLocaleData(localeDe, 'de');
registerLocaleData(localeEn, 'en');

class CustomLoader implements TranslateLoader {

  getTranslation(lang: string): Observable<any> {
    return of({ KEY: 'value' });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    SafeHtml
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CoreModule.forRoot(),  
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader, useClass: CustomLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(translate: TranslateService) {
    translate.setDefaultLang("de");
    registerLocaleData(localeDe);
    registerLocaleData(localeEn);
  }
}
