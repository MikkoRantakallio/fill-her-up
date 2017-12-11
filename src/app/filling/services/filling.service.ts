import {Injectable} from '@angular/core';
import {Filling} from '../models/filling';
import {FillingHttpService} from './filling-http.service';
import {Observable} from 'rxjs/Observable';
import {Info} from '../models/info';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class FillingService {

  info: Info;

  constructor(private fillingHttpService: FillingHttpService) {

    this.info = new Info();
  }

  findFillings(id: string, start: string, end: string): Observable<Filling[]> {
    return this.fillingHttpService.get(id, start, end);
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

  calculateStats(fillingList: Filling[], period: string) {

    if (fillingList.length === 0) {
      return null;
    }

    var dateStart = new Date(fillingList[fillingList.length - 1].date);
    var dateEnd = new Date(fillingList[0].date);

    var kmStart = Number(fillingList[fillingList.length - 1].mileage);
    var kmEnd = Number(fillingList[0].mileage);

    var dateInterval: number;
    dateInterval = (dateEnd.valueOf() - dateStart.valueOf()) / (3600 * 24 * 1000);

    var kmInterval = kmEnd - kmStart;

    this.info.averageKmPerDay = Math.round(kmInterval / dateInterval * 10) / 10;

    this.info.averageConsumption = 11;
    this.info.distance = 985;
  }

  getStats(): Info {
    return this.info;
  }
}

