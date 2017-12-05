import {Component, Input, OnInit} from '@angular/core';
import {Filling} from '../../models/filling';

@Component({
  selector: 'fhu-filling-list-item',
  templateUrl: './filling-list-item.component.html',
  styleUrls: ['./filling-list-item.component.css']
})
export class FillingListItemComponent implements OnInit {

  @Input() filling: Filling;

  constructor() {
  }

  ngOnInit() {
  }
}
