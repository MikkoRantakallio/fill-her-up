import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Filling} from '../models/filling';
import {Router} from '@angular/router';
import {FillingService} from '../services/filling.service';

@Component({
  selector: 'ca-contact-list',
  templateUrl: './filling-list.component.html',
  styleUrls: ['./filling-list.component.css']
})
export class FillingListComponent implements OnInit {

  fillings: Filling[];
  filling: Filling;

  @Output() fillingSelected: EventEmitter<Filling>;

  constructor(private fillingService: FillingService, private router: Router) {
    this.fillings = [];
  }

  ngOnInit() {
/*
    this.fillingService.findFillings().subscribe((fillings: Filling[]) => {
      this.fillings = fillings;
    });*/
  }

  onFillingSelect(filling: Filling) {
    console.log(filling);
    this.router.navigate(['fillings', filling.id]);
  }

  showAddFilling() {
    this.router.navigate(['/add-filling']);
  }


}
