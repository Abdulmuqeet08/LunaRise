import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'dateToDDMMYYYY'
})
export class DateToDDMMYYYY implements PipeTransform {
  transform(value: any): string {
    return moment(value).format('DD-MM-YYYY');
  }
}
