import * as moment from 'moment';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable()
export class MomentDateFormatter extends NgbDateParserFormatter {

    readonly DT_FORMAT = 'L';

    parse(value: string): NgbDateStruct {

        if (value) {
            value = value.trim();
            //TODO einagbe prüfen ob es ein Datum ist 
            let momentDate = moment(value, this.DT_FORMAT)
            let ngbDate = { year: momentDate.year(), month: momentDate.month() - 1, day: momentDate.day() };
            return ngbDate;
        }
        return null;
    }
    format(date: NgbDateStruct): string {
        if (!date) return '';
        let mdt = moment([date.year, date.month - 1, date.day]);
        if (!mdt.isValid()) return '';
        return mdt.format(this.DT_FORMAT);
    }
}