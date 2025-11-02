import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'dateToMMMDDYY'
})
export class DateToMMMDDYY implements PipeTransform {
  transform(value: any): string {
    return moment(value).format('ll');
  }
}
