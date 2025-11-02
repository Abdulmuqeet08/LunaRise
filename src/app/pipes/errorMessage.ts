import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {
  transform(value: any): string {
    let errorMessage;
    if (Array.isArray(value)) {
      errorMessage = value.join('\n');
    } else {
      errorMessage = value;
    }

    return errorMessage;
  }
}
