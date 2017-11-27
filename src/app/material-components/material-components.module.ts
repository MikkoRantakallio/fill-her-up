import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatMenuModule, MatSelectModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const materialModules = [
  MatListModule,
  BrowserAnimationsModule,
  MatCardModule,
  MatMenuModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatSelectModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})

export class MaterialComponentsModule {
}
