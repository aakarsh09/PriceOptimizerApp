import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridTableComponent } from './ag-grid-table/ag-grid-table.component';
import { AgGridModule as AgGridAngularModule } from 'ag-grid-angular'; 


@NgModule({
  declarations: [
    AgGridTableComponent
  ],
  imports: [
    CommonModule,
    AgGridAngularModule
  ],
  exports: [AgGridTableComponent]
})
export class AgGridModule { }
