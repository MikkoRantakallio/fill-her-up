import {Injectable} from '@angular/core';
import {Filling} from '../models/filling';
import {FillingHttpService} from './filling-http.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FillingService {

  constructor(private fillingHttpService: FillingHttpService) {
  }

  findFillings(): Observable<Filling[]> {
    return this.fillingHttpService.get();
  }

  findContactById(id: number): Observable<Filling> {
    return this.fillingHttpService.getById(id);
  }

  updateContact(modifiedFilling: Filling) {

    return this.fillingHttpService.update(modifiedFilling);
  }

  deleteContact(filling: Filling) {

    return this.fillingHttpService.delete(filling.id);
  }

  insertContact(filling: Filling) {
    this.fillingHttpService.create(filling);
  }
}

