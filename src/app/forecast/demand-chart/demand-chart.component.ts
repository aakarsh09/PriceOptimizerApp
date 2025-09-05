import { Component, Input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-demand-chart',
  templateUrl: './demand-chart.component.html',
  styleUrls: ['./demand-chart.component.scss']
})
export class DemandChartComponent {

  @Input() demandData: Array<{ productName: string, demand: Record<string, number> }> = [];
  @Input() columnDefs = [];
  @Input() filteredRowData = [];
  public lineChartData: ChartData<'line'> = {
  labels: ['2020', '2021', '2022'],
  datasets: [
    {
      data: [65, 59, 80],
      label: 'Product A',
      fill: false,
      borderColor: 'purple',
      backgroundColor: 'purple',
      tension: 0.3,
    },
    {
      data: [28, 48, 40],
      label: 'Product B',
      fill: false,
      borderColor: '#00f7c2',
      backgroundColor:'#00f7c2',
      tension: 0.3,
    }
  ]
};
  public lineChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  backgroundColor: 'black',
  layout: {
  padding: {
    top: 30,
    bottom: 60,
    left: 80,
    right: 30
  }
},
  plugins: {
    legend: {
      labels: {
        color: 'white',
        pointStyle: 'circle',
      },
      position: 'bottom',
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'white', 
        font: {
          size: 14,
        }
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.2)', 
      },
      
    },
    y: {
      ticks: {
        color: 'white', 
        font: {
          size: 14,
        }
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.2)', 
      },
    }
  },
    elements: {
    point: {
      radius: 0,  
      hoverRadius: 0, 
      borderWidth: 0,
      backgroundColor: 'transparent', 
      borderColor: 'transparent',
    },
    line: {
      tension: 0.4,
      borderWidth: 3,
    }
  }
};


}



