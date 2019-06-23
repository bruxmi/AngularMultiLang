import { Inject, LOCALE_ID, OnDestroy, Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { LangChangeEvent } from '@ngx-translate/core/lib/translate.service';
import * as _ from 'lodash';

@Pipe({
  name: 'i18nDate',
  pure: false
})
export class I18nDatePipe extends DatePipe implements OnDestroy {
  private changeSubs: any;
  private cache;
  private previousParams = [];

  constructor(@Inject(LOCALE_ID) locale: string,
    translate: TranslateService) {
    super(locale);
    this.changeSubs = translate.onLangChange.subscribe(($event: LangChangeEvent) => {
      (<any>this).locale = $event.lang;
      this.cache = null;
    });
  }

  transform(value: any, format?: string, timezone?: string, locale?: string): string | null {
    const currentParams = [value, format, timezone, locale];
    if (!this.cache || !_.isEmpty(_.difference(this.previousParams, currentParams))) {
      this.previousParams = currentParams;
      this.cache = super.transform(value, format, timezone, locale);
    }
    return this.cache;
  }

  ngOnDestroy(): void {
    this.changeSubs.unsubscribe();
  }

}