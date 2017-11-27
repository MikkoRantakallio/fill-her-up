import {Pipe, PipeTransform} from '@angular/core';
import {Filling} from '../models/filling';
import * as _ from 'lodash';

@Pipe({
  name: 'contactAddress'
})
export class ContactAddressPipe implements PipeTransform {

  transform(contact: Filling, args?: any): any {

    let addressParts = [contact.streetAddress || null, contact.city || null];
    addressParts = _.reject(addressParts, _.isNull);

    return addressParts.join(', ') || 'no address';
  }

}
