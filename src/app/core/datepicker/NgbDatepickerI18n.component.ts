import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '../services/language.service';
import { DatepickerTranslationService } from './datepickerTranslation.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, } from '@angular/forms';
import { MomentDateFormatter } from './MomentDateFormatter';
import { Subscription } from 'rxjs';

export const DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbdDatepickerI18n),
    multi: true
};

@Component({
    selector: 'cvb-datepicker',
    templateUrl: './NgbdDatepickerI18n.component.html',
    providers: [
        DATEPICKER_VALUE_ACCESSOR,
        { provide: NgbDateParserFormatter, useClass: MomentDateFormatter },
        { provide: NgbDatepickerI18n, useClass: DatepickerTranslationService }]
})
export class NgbdDatepickerI18n implements ControlValueAccessor, OnInit, OnDestroy {

    constructor(private lang: LanguageService) { }

    selectedDate: NgbDateStruct;
    disabled = false;

    private langSub : Subscription;

    ngOnInit(): void {
        this.langSub = this.lang.currentLang$.subscribe(a => {
            //NgbDatepicker verwendet OnPush Strategy, damit sich die UI updated muss nachgeholfen werden
            this.selectedDate = { ...this.selectedDate, ...this.selectedDate };
        });
    }

    ngOnDestroy(): void {this.langSub.unsubscribe();}

    // Function to call when the date changes.
    onChange = (date?: Date) => { };

    // Function to call when the date picker is touched
    onTouched = () => { 
    };

    writeValue(value: Date) {
        if (!value) return;
        this.selectedDate = {
            year: value.getFullYear(),
            month: value.getMonth(),
            day: value.getDate()
        }
    }

    registerOnChange(fn: (date: Date) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onDateChange(value: Date) {
        this.onChange(value);
    }

    onDateSelect(value: any) {
        var date = new Date(value.year, value.month - 1, value.day);
        this.onChange(date);
        this.onTouched();
    }
}