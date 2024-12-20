import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../../../types/address';

@Pipe({
  name: 'addressPipe',
  standalone: true
})
export class AddressPipePipe implements PipeTransform {

  transform(data: Address): string {
    if (data == undefined) return data;
    return `${data.street}, ${data.number} - ${data.city}, ${data.uf}`;
  }

}
