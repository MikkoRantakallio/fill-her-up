import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Filling} from '../models/filling';
import {ContactLocalStorageService} from '../services/contact-local-storage.service';
import {DomSanitizer} from '@angular/platform-browser';
import {FillingService} from '../services/filling.service';

@Component({
  selector: 'ca-add-contact',
  templateUrl: './add-filling.component.html',
  styleUrls: ['./add-filling.component.css']
})
export class AddContactComponent implements OnInit {


  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  mapPath: string;

  @ViewChild('map') mapFrameElement: ElementRef;

  public contact: Filling;

  constructor(private router: Router, private contactService: FillingService, private route: ActivatedRoute, public sanitizer: DomSanitizer) {

    this.contact = null;
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);

    if (this.id > 0) {
      this.contactService.findContactById(this.id).subscribe((contact: Filling) => {
        this.contact = contact;

        this.firstName = this.contact.firstName;
        this.lastName = this.contact.lastName;
        this.phoneNumber = this.contact.phoneNumber;
        this.streetAddress = this.contact.streetAddress;
        this.city = this.contact.city;
      });
    }
    this.refreshMapFrame();
  }

  refreshMapFrame() {
    setTimeout(() => {
      const mapFrame = this.mapFrameElement.nativeElement;

      if (this.streetAddress != null) {
        mapFrame.src = 'https://maps.google.com/maps?q=' + this.streetAddress + ',' + this.city + '&output=embed';
      }
      else {
        mapFrame.src = 'https://maps.google.com/maps?q=lappeenranta&output=embed';
      }
    });
  }

  insertContact() {

    const mapFrame = this.mapFrameElement.nativeElement;

    if (this.firstName.length > 0 && this.lastName.length > 0) {
      let contact: Filling = new Filling(this.id, this.firstName, this.lastName, this.phoneNumber, this.streetAddress, this.city);

      if (this.id === 0) {
        this.contactService.insertContact(contact);
        this.firstName = '';
        this.lastName = '';
        this.phoneNumber = '';
        this.streetAddress = '';
        this.city = '';
        mapFrame.src = 'https://maps.google.com/maps?q=lappeenranta&output=embed';
      }
      else {

        this.contactService.updateContact(contact);
      }
    }
  }

  deleteContact(contact: Filling) {

    const mapFrame = this.mapFrameElement.nativeElement;

    this.contactService.deleteContact(this.contact);

    this.firstName = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.streetAddress = '';
    this.city = '';
    this.id = 0;
    mapFrame.src = 'https://maps.google.com/maps?q=lappeenranta&output=embed';
  }

  showContacts() {
    this.router.navigate(['/fillings']);
  }
}
