import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Filling} from '../models/filling';
import {ActivatedRoute, Router} from '@angular/router';
import {FillingService} from '../services/filling.service';

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

  @Output() fillingSelected: EventEmitter<Filling>;

  constructor(private fillingService: FillingService, private router: Router, private route: ActivatedRoute) {
    this.fillings = [];
  }

  ngOnInit() {

    this.license = this.route.snapshot.paramMap.get('id');
    console.log(this.license);
    this.period = this.route.snapshot.paramMap.get('period');
    console.log(this.period);

    if (this.license != null && this.period != null) {

      this.fillingService.findFillings(this.license).subscribe((fillings: Filling[]) => {
        this.fillings = fillings;
      });
    }
  }

  onFillingSelect(filling: Filling) {
    console.log(filling);
    this.router.navigate(['fillings', filling.id]);
  }

  showAddFilling() {
    this.router.navigate(['/add-filling']);
  }


}
