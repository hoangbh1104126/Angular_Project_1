import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'check'
})
export class CheckPipe implements PipeTransform {

  transform(str: string ): string {
    str.toLowerCase();
    return str == "account_number" ? "User ID" : str == "firstname" ? "Username" : str;
  }

}
