import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FillingHttpService} from './filling/services/filling-http.service';
import {Car} from './filling/models/car';
import {Period} from './filling/models/period';

@Component({
  selector: 'ca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';

  selectedCar: string;
  selectedPeriod: string;

  cars: Car[];
  car: Car;

  periods: Period[];
  period: Period;

  monthDesc = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(private router: Router, private fillingHttpService: FillingHttpService) {

  }

  ngOnInit() {

    this.fillingHttpService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars
    });

    this.periods = new Array<Period>();

    this.period = new Period('All', 'All');
    this.periods.push(this.period);

    var date = new Date();

    var month = date.getMonth();
    var year = date.getFullYear();

    for (var i = 12; i > 1; i--) {

      var text = this.monthDesc[month - 1] + '-' + year;
      var value = year + '-' + month;

      this.period = new Period(value, text);
      this.periods.push(this.period);

      month--;
      if (month < 1) {
        month = 12;
        year--;
      }
    }
  }

  getFillings() {

    if (this.selectedCar && this.selectedPeriod) {

      console.log(this.selectedCar);
      console.log(this.selectedPeriod);

      this.router.navigate(['fillings', this.selectedCar, this.selectedPeriod]);

    }
  }
}
