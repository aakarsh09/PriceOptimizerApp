import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForecastRoutingModule } from './forecast-routing.module';
import { DemandChartComponent } from './demand-chart/demand-chart.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    DemandChartComponent,
  ],
  imports: [
    CommonModule,
    ForecastRoutingModule,
    NgChartsModule,
  ]
})
export class ForecastModule { }
