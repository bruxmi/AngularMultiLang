import { Injectable} from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '../services/language.service';

const I18N_VALUES = {
    'de': {
        weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
        months: ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    },
    'en': {
        weekdays: ['Mo', 'Tu', 'We', 'Thu', 'Fri', 'Sat', 'Sun'],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    }
};

@Injectable()
export class DatepickerTranslationService extends NgbDatepickerI18n {

    constructor(private languageService: LanguageService) {
        super();
    }

    getWeekdayShortName(weekday: number): string {
        return I18N_VALUES[this.languageService.getCurrentLang()].weekdays[weekday - 1];
    }
    getMonthShortName(month: number): string {
        return I18N_VALUES[this.languageService.getCurrentLang()].months[month - 1];
    }
    getMonthFullName(month: number): string {
        return this.getMonthShortName(month);
    }

    getDayAriaLabel(date: NgbDateStruct): string {
        return `${date.day}-${date.month}-${date.year}`;
    }
}