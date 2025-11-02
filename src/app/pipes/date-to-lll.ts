import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'dateToLLL'
})
export class DateToLLL implements PipeTransform {
  transform(value: any): string {
    return moment(value).format('lll');
  }
}
