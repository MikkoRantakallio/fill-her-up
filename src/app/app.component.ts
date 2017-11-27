import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FillingHttpService} from "./filling/services/filling-http.service";
import {Car} from "./filling/models/car";

@Component({
  selector: 'ca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  selectedCar: string;

  cars: Car[];
  car: Car;

  foods = [];

  constructor(private router: Router, private fillingHttpService: FillingHttpService) {

  }

  ngOnInit() {

    this.fillingHttpService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars
    });
  }

  getFillings() {

    console.log(this.selectedCar);
  }
}
