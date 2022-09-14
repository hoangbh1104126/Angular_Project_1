import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noValue'
})
export class NoValuePipe implements PipeTransform {

  transform(value: any): string {
    return value === undefined || value.length == 0 ? "---" : value;
  }

}