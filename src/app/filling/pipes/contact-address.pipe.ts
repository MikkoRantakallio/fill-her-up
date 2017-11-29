import {Pipe, PipeTransform} from '@angular/core';
import {Filling} from '../models/filling';
import * as _ from 'lodash';

@Pipe({
  name: 'contactAddress'
})
export class ContactAddressPipe implements PipeTransform {

  transform(contact: Filling, args?: any): any {

    let addressParts = [contact.price || null, contact.mileage || null];
    addressParts = _.reject(addressParts, _.isNull);

    return addressParts.join(', ') || 'no address';
  }

}
