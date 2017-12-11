export class Info {

  distance: number;
  averageConsumption: number;
  averageKmPerDay: number;
  highestPricePerLiter: number;
  lowestPricePerLiter: number;
  totalFuelBought: number;
  totalMoneyUsed: number;

  constructor(dist?: number, avgCons?: number, avgKmPerDay?: number) {

    this.distance = dist;
    this.averageConsumption = avgCons;
    this.averageKmPerDay = avgKmPerDay;
  }

  clear() {

    this.distance = null;
    this.averageConsumption = null;
    this.averageKmPerDay = null;
    this.highestPricePerLiter = null;
    this.lowestPricePerLiter = null;
    this.totalFuelBought = null;
    this.totalMoneyUsed = null;
  }
}
