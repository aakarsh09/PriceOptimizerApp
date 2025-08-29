import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForecastRoutingModule } from './forecast-routing.module';
import { DemandChartComponent } from './demand-chart/demand-chart.component';


@NgModule({
  declarations: [
    DemandChartComponent
  ],
  imports: [
    CommonModule,
    ForecastRoutingModule
  ]
})
export class ForecastModule { }
