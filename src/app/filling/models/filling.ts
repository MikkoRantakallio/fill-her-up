export class Filling {

  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;

  constructor(id?: number, fName?: string, lName?: string, pNumber?: string, sAddress?: string, city?: string) {
    this.id = id;
    this.firstName = fName;
    this.lastName = lName;
    this.phoneNumber = pNumber;
    this.streetAddress = sAddress;
    this.city = city;
  }
}
