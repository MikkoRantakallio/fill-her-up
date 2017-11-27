import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {Filling} from '../models/filling';

@Injectable()
export class ContactLocalStorageService {

  private contacts: Filling[];

  localStorageKey: string;

  constructor() {

    this.localStorageKey = 'ca-fillings';
    this.initializeLocalStorage();
    this.contacts = this.readLocalStorageContacts();

    if (this.contacts.length === 0) {

      this.contacts = [
        new Filling(1, 'Matti', 'Heikkinen', '050-8887776', 'Kaarikatu 6', 'Espoo'),
        new Filling(2, 'Iivo', 'Niskanen', '040-1115556', 'Kuusitie 4', 'Kuopio'),
        new Filling(3, 'Sami', 'Jauhojärvi', '050-1230981', 'Maisterinkatu 10', 'Lahti'),
        new Filling(4, 'Ville', 'Nousiainen', '050-5645222', 'Sompakatu 10', 'Rovaniemi'),
        new Filling(5, 'Martti', 'Jylhä', '040-7761212', 'Latutie 11', 'Tornio')
      ];
      this.writeLocalStorageContacts(this.contacts);
    }
  }

  findContacts(): Filling[] {
    return this.readLocalStorageContacts();
  }

  findContactById(id: number): Filling {

    var i: number;
    this.contacts = this.readLocalStorageContacts();
    for (i = 0; i < this.contacts.length; i++) {

      if (this.contacts[i].id === id) {
        return this.contacts[i];
      }
    }
    return null;
  }

  updateContact(modifiedContact: Filling) {

    this.contacts = this.readLocalStorageContacts();
    var i: number;

    for (i = 0; i < this.contacts.length; i++) {

      if (this.contacts[i].id === modifiedContact.id) {
        this.contacts[i] = modifiedContact;
        break;
      }
    }
    this.writeLocalStorageContacts(this.contacts);
  }

  deleteContact(contact: Filling) {

    var idToDelete = contact.id;

    if (idToDelete > 0) {

      this.contacts = this.readLocalStorageContacts();

      _.remove(this.contacts, function (cont) {
        return cont.id === idToDelete;
      });
      this.writeLocalStorageContacts(this.contacts);
    }
  }

  insertContact(contact: Filling) {

    const contacts = this.readLocalStorageContacts();

    contact.id = this.getNextId();
    contacts.push(contact);
    this.writeLocalStorageContacts(contacts);
  }

  private initializeLocalStorage() {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  private readLocalStorageContacts(): Filling[] {
    const data = localStorage.getItem(this.localStorageKey);
    return JSON.parse(data) as Filling[];
  }

  private writeLocalStorageContacts(contacts) {
    const data = JSON.stringify(contacts);
    localStorage.setItem(this.localStorageKey, data);
  }

  private getNextId(): number {
    var i: number;
    var max: number;

    max = 0;
    this.contacts = this.readLocalStorageContacts();
    for (i = 0; i < this.contacts.length; i++) {

      if (this.contacts[i].id > max) {
        max = this.contacts[i].id;
      }
    }
    return max + 1;
  }
}
