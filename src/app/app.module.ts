import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FillingListItemComponent} from './filling/filling-list/filling-list-item/filling-list-item.component';
import {FillingListComponent} from './filling/filling-list/filling-list.component';
import {ContactLocalStorageService} from './filling/services/contact-local-storage.service';
import {MaterialComponentsModule} from './material-components/material-components.module';
import {RouterModule, Routes} from '@angular/router';
import {AddContactComponent} from './filling/add-filling/add-filling.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {ContactAddressPipe} from './filling/pipes/contact-address.pipe';
import {ContactLoginComponent} from './filling/contact-login/contact-login.component';
import {LoginService} from './filling/services/login.service';
import {ContactLogoutComponent} from './filling/contact-logout/contact-logout.component';
import {FillingService} from './filling/services/filling.service';
import {FillingHttpService} from './filling/services/filling-http.service';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: FillingListComponent
  },
  {
    path: 'add-filling',
    component: AddContactComponent
  },
  {
    path: 'fillings/:id',
    component: FillingListComponent
  },
  {
    path: 'fillings/:id/:period',
    component: FillingListComponent
  },
  /*{
    path: 'fillings',
    component: AppComponent
  },*/
  {
    path: 'logout',
    component: ContactLogoutComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    FillingListItemComponent,
    FillingListComponent,
    AddContactComponent,
    ContactAddressPipe,
    ContactLoginComponent,
    ContactLogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialComponentsModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [
    ContactLocalStorageService,
    FillingService,
    FillingHttpService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
