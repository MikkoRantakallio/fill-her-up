import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'ca-contact-logout',
  templateUrl: './contact-logout.component.html',
  styleUrls: ['./contact-logout.component.css']
})
export class ContactLogoutComponent implements OnInit {

  constructor(private logoutService: LoginService) { }

  ngOnInit() {

    this.logoutService.logout();
  }

}
