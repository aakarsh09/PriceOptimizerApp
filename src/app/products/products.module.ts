import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AgGridModule } from '../shared/ag-grid/ag-grid.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    AgGridModule,
    ReactiveFormsModule
    
  ]
})
export class ProductsModule { }
