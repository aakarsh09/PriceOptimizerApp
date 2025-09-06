import { Component, Inject, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ForecastService } from './forecast.service';
import { ProductsService } from 'src/app/products/products.service';
import { Product, ColumnDef } from 'src/app/products/models/product.model';


@Component({
  selector: 'app-demand-chart',
  templateUrl: './demand-chart.component.html',
  styleUrls: ['./demand-chart.component.scss']
})
export class DemandChartComponent implements OnInit {
  productIds: number[] = [];
  filteredRowData: Product[];
  columnDef: ColumnDef[];

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };
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
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      x: {
        type: 'category',
        ticks: { color: 'white', font: { size: 12 } },
        grid: { color: 'rgba(255, 255, 255, 0.2)' }
      },
      y: {
        type: 'linear',
        ticks: { color: 'white', font: { size: 12 } },
        grid: { color: 'rgba(255, 255, 255, 0.2)' },
        beginAtZero: true,
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
    @Inject(MAT_DIALOG_DATA) public data: { productIds: number[] },
    private forecastService: ForecastService,
    private productsService: ProductsService
  ) {
    this.productIds = data.productIds;
  }

  ngOnInit(): void {
    this.generateAndLoadChartData();
    this.getProductData();
  }

  getProductData()
  {
     if(!this.productIds || !this.productIds.length) {
      console.warn('No product IDs available to fetch');
      return;
    }
    this.productsService.filterProductsByIds(this.productIds).subscribe({
      next:(data)=>{
          const styledColumns = data.columns.map((col: any) => {
          if (col.field === 'demand_forecast') {
            return {
              ...col,
              cellStyle: {
                backgroundColor: '#6FFFE9', 
                fontWeight:'bold'
              }
            };
          }
          return col;
        });

        this.columnDef = styledColumns;
        this.filteredRowData = data.rows;
      }
    })
  }

  generateAndLoadChartData(): void {
    this.forecastService.generateForecast(this.productIds).subscribe({
      next: () => {
        this.loadChartData();
      },
      error: (err) => console.error('Error generating forecast data', err)
    });
  }

  loadChartData(): void {
    this.forecastService.getChartData(this.productIds).subscribe({
      next: (data) => {
        this.lineChartData = this.formatChartData(data as any);
        console.log(this.lineChartData);
      },
      error: (err) => {
        console.error('Error loading chart data', err);
        this.lineChartData = { labels: [], datasets: [] };
      }
    });
  }

  formatChartData(rawData: any): ChartData<'line'> {
  if (!rawData || !rawData.products || !rawData.years) {
    return { labels: [], datasets: [] };
  }

  // Sort products alphabetically to fix order
  const sortedProducts = [...rawData.products].sort();

  // Create a map from product name to its index in raw data
  const productIndexMap = rawData.products.reduce((map: Record<string, number>, product: string, index: number) => {
    map[product] = index;
    return map;
  }, {});

  const lastYearIndex = rawData.years.length - 1;

  // Reorder demand and price data according to sortedProducts
  const demandValues = sortedProducts.map(product => {
    const idx = productIndexMap[product];
    return rawData.demand_data[idx][lastYearIndex] || 0;
  });

  const priceValues = sortedProducts.map(product => {
    const idx = productIndexMap[product];
    return rawData.price_data[idx][lastYearIndex] || 0;
  });

  const datasets = [
    {
      label: 'Forecasted Demand',
      data: demandValues,
      borderColor: '#00f7c2',  // neon
      backgroundColor: 'transparent',
      fill: false,
      tension: 0.3,
      yAxisID: 'y',
    },
    {
      label: 'Avg Selling Price',
      data: priceValues,
      borderColor: '#9b59b6',  // purple
      backgroundColor: 'transparent',
      fill: false,
      tension: 0.3,
      yAxisID: 'y',
    }
  ];

  return {
    labels: sortedProducts,
    datasets,
  };
}


  cancelForm(): void {
    this.dialogRef.close(false);
  }
}
