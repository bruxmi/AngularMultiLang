import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nDatePipe } from './pipes/I18nDate.pipe';
import { LanguageService } from './services/language.service';
import { NgbdDatepickerI18n } from './datepicker/NgbDatepickerI18n.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorHandlerService } from './services/errorHandler.service';
import { ErrorService } from './services/error.service';
import { LoggingService } from './services/logging.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerErrorInterceptor } from './interceptors/serverError.interceptor';

@NgModule({
  declarations: [
    I18nDatePipe,
    NgbdDatepickerI18n,
  ],
  imports: [ CommonModule, FormsModule, NgbModule, TranslateModule ],
  exports: [ I18nDatePipe, NgbdDatepickerI18n ],
  bootstrap: [NgbdDatepickerI18n]
})
export class CoreModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [ 
        { provide: ErrorHandler, useClass: ErrorHandlerService },
        { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
        ErrorService,
        LoggingService,
        LanguageService,
      ]
    };
  }
}
