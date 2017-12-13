import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FillingHttpService} from './filling/services/filling-http.service';
import {Car} from './filling/models/car';
import {Period} from './filling/models/period';
import {Info} from './filling/models/info';
import {FillingService} from './filling/services/filling.service';

@Component({
  selector: 'ca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';

  selectedCar: string;
  selectedStartMonth: string;
  selectedEndMonth: string;

  cars: Car[];
  car: Car;

  startMonths: Period[];
  period: Period;

  endMonths: Period[];
  endMonth: Period;

  info: Info;

  monthDesc = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(private router: Router, private fillingHttpService: FillingHttpService, private fillingService: FillingService) {

  }

  ngOnInit() {

    this.fillingHttpService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars
    });

    this.startMonths = new Array<Period>();
    this.endMonths = new Array<Period>();

    this.period = new Period('All', 'All');
    this.startMonths.push(this.period);

    var date = new Date();

    var month = date.getMonth();
    var year = date.getFullYear();

    for (var i = 12; i > 1; i--) {

      var text = this.monthDesc[month] + '-' + year;

      var value = year + '-';

      if (month + 1 < 10) {
        value = value + '0' + (month + 1);

      } else {
        value = value + (month + 1);
      }

      this.period = new Period(value, text);
      this.startMonths.push(this.period);
      this.endMonths.push(this.period);

      month--;
      if (month < 0) {
        month = 11;
        year--;
      }
    }
    this.info = this.fillingService.getStats();
  }

  getFillings() {

    if (this.selectedCar && (this.selectedStartMonth <= this.selectedEndMonth || this.selectedStartMonth === 'All')) {

      console.log(this.selectedCar);
      console.log(this.selectedStartMonth);

      if (this.selectedStartMonth === 'All') {
        this.selectedEndMonth = null;
      }

      this.router.navigate(['fillings', this.selectedCar, this.selectedStartMonth + '-' + this.selectedEndMonth]);

      this.info = this.fillingService.getStats();
    }
  }

  clear() {
    this.info.clear();
    this.selectedCar = null;
    this.selectedStartMonth = null;
    this.selectedEndMonth = null;
  }
}
