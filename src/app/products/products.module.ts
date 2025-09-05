import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AgGridModule } from '../shared/ag-grid/ag-grid.module';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { ForecastModule } from '../forecast/forecast.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    AgGridModule,
    MatInputModule,
    SharedModule,
    ForecastModule
  ]
})
export class ProductsModule { }
