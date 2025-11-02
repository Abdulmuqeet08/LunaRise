import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'dateToYYYYMMDD'
})
export class DateToYYYYMMDD implements PipeTransform {
  transform(value: any): string {
    if (value) {
      return moment(value).format('YYYY-MM-DD');
    }
  }
}
