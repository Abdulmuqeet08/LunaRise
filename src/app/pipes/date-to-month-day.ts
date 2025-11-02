import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'dateToMonthDay'
})
export class DateToMonthDay implements PipeTransform {
  transform(value: any): string {
    const dateValue = moment(value);
    return `${dateValue.format('MMM')} ${dateValue.format('DD')}`;
  }
}
