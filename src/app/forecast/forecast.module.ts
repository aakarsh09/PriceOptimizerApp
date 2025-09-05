import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForecastRoutingModule } from './forecast-routing.module';
import { DemandChartComponent } from './demand-chart/demand-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { AgGridModule } from '../shared/ag-grid/ag-grid.module';


@NgModule({
  declarations: [
    DemandChartComponent,
  ],
  imports: [
    CommonModule,
    ForecastRoutingModule,
    NgChartsModule,
    AgGridModule
  ]
})
export class ForecastModule { }
