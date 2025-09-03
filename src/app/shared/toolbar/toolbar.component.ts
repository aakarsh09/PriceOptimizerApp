import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() showToolBar:Boolean = false;
  @Output() isAddProducts = new EventEmitter<boolean>();

  addProductsEmitter()
  {
    console.log("-asdfffff")
    this.isAddProducts.emit(true);
  }
}
