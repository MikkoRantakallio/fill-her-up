import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Filling} from '../models/filling';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {FillingService} from '../services/filling.service';
import {Info} from '../models/info';

@Component({
  selector: 'ca-filling-list',
  templateUrl: './filling-list.component.html',
  styleUrls: ['./filling-list.component.css']
})
export class FillingListComponent implements OnInit {

  license: string;
  period: string;

  fillings: Filling[];
  filling: Filling;
  info: Info;

  @Output() calculatedInfo: EventEmitter<Info>;

  constructor(private fillingService: FillingService, private router: Router, private route: ActivatedRoute) {
    this.fillings = [];
  }

  ngOnInit() {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });

    this.license = this.route.snapshot.paramMap.get('id');
    console.log(this.license);
    this.period = this.route.snapshot.paramMap.get('period');
    console.log(this.period);

    if (this.license && this.period) {

      this.fillingService.findFillings(this.license).subscribe((fillings: Filling[]) => {
        this.fillings = fillings;

        if (this.fillings.length === 0) {

          var fill: Filling;
          fill = new Filling(0, '', 'No data', '', '', '');
          this.fillings.push(fill);
        }

        this.calculateStatistics();
      });
    }
  }

  onFillingSelect(filling: Filling) {
    console.log(filling);
//    this.router.navigate(['fillings', filling.id]);
  }

  showAddFilling() {
    this.router.navigate(['/add-filling']);
  }

  calculateStatistics() {

    this.info = new Info();
    this.info.averageConsumption = 9;
    this.info.distance = 500;
  }
}
