import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameColor',
})
export class NameColorPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value === 'danger') {
      return 'Rojo';
    } else if (value === 'success') {
      return 'Verde';
    } else if (value === 'warning') {
      return 'Amarillo';
    } else {
      return 'No definido';
    }
  }

}
