import { Component, Inject } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-demand-chart',
  templateUrl: './demand-chart.component.html',
  styleUrls: ['./demand-chart.component.scss']
})
export class DemandChartComponent {

  demandData: Array<{ productName: string, demand: Record<string, number> }> = [];
  columnDefs: any[] = [];
  filteredRowData: any[] = [];

  public lineChartData!: ChartData<'line'>;
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 30, bottom: 60, left: 80, right: 30 }
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
        ticks: { color: 'white', font: { size: 12 } },
        grid: { color: 'rgba(255, 255, 255, 0.2)' }
      },
      y: {
        ticks: { color: 'white', font: { size: 12 } },
        grid: { color: 'rgba(255, 255, 255, 0.2)' }
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

  constructor(
    private dialogRef: MatDialogRef<DemandChartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      demandData: Array<{ productName: string, demand: Record<string, number> }>,
      columnDefs: any[],
      filteredRowData: any[]
    }
  ) {
    // Assign injected data to local properties
    this.demandData = data.demandData;
    this.columnDefs = data.columnDefs;
    this.filteredRowData = data.filteredRowData;

    // Generate lineChartData dynamically from demandData
    this.lineChartData = this.createChartData(this.demandData);
  }

  private createChartData(demandData: Array<{ productName: string, demand: Record<string, number> }>): ChartData<'line'> {
    if (!demandData.length) return { labels: [], datasets: [] };

    // Extract labels (e.g., years) from the first product’s demand keys
    const labels = Object.keys(demandData[0].demand);

    // Map each product to a dataset with data points and styling
    const datasets = demandData.map((product, index) => ({
      label: product.productName,
      data: labels.map(label => product.demand[label] ?? 0),
      fill: false,
      borderColor: index === 0 ? 'purple' : '#00f7c2',
      backgroundColor: index === 0 ? 'purple' : '#00f7c2',
      tension: 0.3
    }));

    return { labels, datasets };
  }

  cancelForm() {
    this.dialogRef.close(false);
  }
}
