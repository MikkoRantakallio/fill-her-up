import {Injectable} from '@angular/core';

@Injectable()
export class LoginService {

  constructor() {
  }

  login() {

    console.log('Login');
  }

  logout (){

    console.log('Logout');
  }
}
