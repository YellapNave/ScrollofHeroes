import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstword'
})

export class FirstwordPipe implements PipeTransform {

    transform(value: string): string {
       if (!value) { return value; }
       value=value.trim();      
       return value.split(' ')[0];
     }

}
