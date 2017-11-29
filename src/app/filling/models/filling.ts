export class Filling {

  id: number;
  car: string;
  date: string;
  amount: string;
  price: string;
  mileage: string;

  constructor(id?: number, car?: string, date?: string, amount?: string, price?: string, mileage?: string) {
    this.id = id;
    this.car = car;
    this.date = date;
    this.amount = amount;
    this.price = price;
    this.mileage = mileage;
  }
}
