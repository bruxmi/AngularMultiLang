import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nDatePipe } from './pipes/I18nDate.pipe';
import { LanguageService } from './services/language.service';
import { NgbdDatepickerI18n } from './datepicker/NgbDatepickerI18n.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

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
      providers: [ LanguageService ]
    };
  }
}
