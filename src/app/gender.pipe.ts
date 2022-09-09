import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(gender: string ): string {
    return gender == "M" ? "Male" : "Female";
  }

}
