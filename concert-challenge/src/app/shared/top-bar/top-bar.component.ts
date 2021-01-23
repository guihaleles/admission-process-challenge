import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit {

  filter:string = '';
  @Output() newItemEvent = new EventEmitter();
  @Output() listEvent = new EventEmitter();
  @Input() pageName = '';

  constructor() {}

  ngOnInit(): void {
  }
  
  addNewItem() {
    this.newItemEvent.emit();
  }

  list() {
    console.log(this.filter);
    this.listEvent.emit(this.filter);
  }

  
}
