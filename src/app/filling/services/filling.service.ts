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

    if (fillingList.length <= 1) {
      this.info.clear();
      return null;
    }

// Average km per day
    var dateStart = new Date(fillingList[fillingList.length - 1].date);
    var dateEnd = new Date(fillingList[0].date);

    var kmStart = Number(fillingList[fillingList.length - 1].mileage);
    var kmEnd = Number(fillingList[0].mileage);

    var dateInterval: number;
    dateInterval = (dateEnd.valueOf() - dateStart.valueOf()) / (3600 * 24 * 1000);

    var kmInterval = kmEnd - kmStart;
    this.info.averageKmPerDay = Math.round(kmInterval / dateInterval * 10) / 10;

// Average consumption

    var fuelUsed: number;
    fuelUsed = 0.0;

    for (var i = fillingList.length - 1; i >= 1; i--) {

      fuelUsed += Number(fillingList[i].amount);
    }

    this.info.averageConsumption = Math.round(fuelUsed / (kmInterval / 100) * 10) / 10;

// Driven distance

    this.info.distance = kmInterval;

// Prices etc

    this.info.highestPricePerLiter = 0;
    this.info.lowestPricePerLiter = 1000;
    this.info.totalFuelBought = 0;
    this.info.totalMoneyUsed = 0;

    for (var i = 0; i <= fillingList.length - 1; i++) {

      var pricePerLiter = Number(fillingList[i].price) / Number(fillingList[i].amount);

      if (pricePerLiter > this.info.highestPricePerLiter) {
        this.info.highestPricePerLiter = Math.round(pricePerLiter * 1000) / 1000;
      }
      if (pricePerLiter < this.info.lowestPricePerLiter) {
        this.info.lowestPricePerLiter = Math.round(pricePerLiter * 1000) / 1000;
      }

      this.info.totalFuelBought += Number(fillingList[i].amount);
      this.info.totalMoneyUsed += Number(fillingList[i].price);
    }

// Ensure proper rounding

    this.info.totalFuelBought = Math.round(this.info.totalFuelBought * 100) / 100;
    this.info.totalMoneyUsed = Math.round(this.info.totalMoneyUsed * 100) / 100;
  }

  getStats(): Info {
    return this.info;
  }
}

