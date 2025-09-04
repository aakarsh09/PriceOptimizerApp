import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() showToolBar:Boolean = false;
  @Output() isAddProducts = new EventEmitter<boolean>();
  categoryControl = new FormControl('');
  @Input() categoryOptions:string[] = [];

  addProductsEmitter()
  {
    this.isAddProducts.emit(true);
  }
}
