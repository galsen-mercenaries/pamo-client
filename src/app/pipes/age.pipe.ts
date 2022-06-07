import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const today = new Date().getFullYear();
    if(value) {
      const birth_year = +value;
      return today - birth_year;
    }
    return null

  }

}
