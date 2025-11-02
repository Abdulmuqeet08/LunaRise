import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'dateToDDMMMYYYY'
})
export class DateToDDMMMYYYY implements PipeTransform {
  transform(value: any): string {
    return moment(value).format('DD-MMM-YYYY');
  }
}
