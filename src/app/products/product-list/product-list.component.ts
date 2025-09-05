import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ColDef } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { CurrencyPipe } from '@angular/common';
import { DemandChartComponent } from 'src/app/forecast/demand-chart/demand-chart.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [CurrencyPipe]
})
export class ProductListComponent implements OnInit {

  columnDefs: ColDef[] = [];
  rowData: any[] = [];
  uniqueCategories:string[]=[];
  filteredRowData: any[] = [];
  isEditMode:boolean = false;

  checkboxColumn: ColDef = {
    headerName: '',
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 50,
    pinned: 'left',
    sortable: false,
    filter: false,
    resizable: false,
    suppressMenu: true,
  };

  constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
    private currencyPipe: CurrencyPipe,
  ) {}

  ngOnInit(): void {
      this.loadProducts();
  }

  loadProducts(search: string = '') {
    this.productService.getProducts(search).subscribe({
      next: (data) => this.handleProductData(data),
      error: (err) => console.error('Error loading products:', err)
    });
  }

  private handleProductData(data: any) {
    const enhancedColumns = this.createColumns(data.columns);
    const actionsColumn: ColDef = this.createActionsColumn();

    this.columnDefs = [this.checkboxColumn, actionsColumn, ...enhancedColumns];
    this.rowData = this.formatCurrencyFields(data.rows);
    this.filteredRowData = this.rowData;

    const allCategories = (data.rows as any[]).map(row => row.category as string);
    this.uniqueCategories = [...new Set(allCategories)];
  }

  private createColumns(columns: any[]): ColDef[] {
    return columns.map(col => {
      if (col.field === 'id') {
        return { ...col, hide: true };
      }

      // Point columns to formatted display fields
      if (col.field === 'cost_price') col.field = 'display_cost_price';
      if (col.field === 'selling_price') col.field = 'display_selling_price';
      if (col.field === 'optimized_price') col.field = 'display_optimized_price';

      let flexValue = 1;
      if (col.field === 'description') flexValue = 3;
      else if (col.field === 'name') flexValue = 2;
      else if (col.field === 'category') flexValue = 1.5;

      return {
        ...col,
        flex: flexValue,
        wrapText: true,
        autoHeight: true,
        cellClass: 'left-align'
      };
    });
  }


  private createActionsColumn(): ColDef {
    return {
      headerName: 'Actions',
      field: 'actions',
      width: 120,
      pinned: 'right',
      editable: false,
      cellRenderer: () => `
        <span class="action-icons" style="cursor:pointer; display:flex; gap:12px; justify-content:center; align-items:center;">
          <i class="fas fa-edit edit-icon" title="Edit"></i>
          <i class="fas fa-trash delete-icon" title="Delete"></i>
          <i class="fas fa-eye view-icon" title="View"></i>
        </span>
      `,
      onCellClicked: (event) => this.handleActionClick(event)
    };
  }

  private formatCurrencyFields(rows: any[]): any[] {
  return rows.map(row => ({
    ...row,
    display_cost_price: this.currencyPipe.transform(row.cost_price, 'USD', 'symbol', '1.2-2'),
    display_selling_price: this.currencyPipe.transform(row.selling_price, 'USD', 'symbol', '1.2-2'),
    display_optimized_price: this.currencyPipe.transform(row.optimized_price, 'USD', 'symbol', '1.2-2'),
  }));
  }

  

  openAddProductForm(event:any) {
    if(event == true)
    {
      const dialogRef = this.dialog.open(ProductFormComponent, {
        width: '600px',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((result) => {
      this.isEditMode = false;
      if (result) this.loadProducts();
    });
    }
  }

  onCategoryChanged(category:any) {
    if (!category || category=="select a category") {
      this.filteredRowData = this.rowData;
    } else{
      this.filteredRowData = this.rowData.filter(p => p.category === category);
    }
  }

  handleRowClick(event: any) {
    console.log('Row clicked:', event.data);
  }

  deleteProduct(id: number, event: any): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          event.api.applyTransaction({ remove: [event.data] });
        },
        error: (err) => {
          console.error('Delete failed:', err);
        },
      });
    }
  }

  openEditProductForm(product: any): void {
    this.isEditMode = true;
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '600px',
      disableClose: true,
      data: {
        product: product
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.isEditMode = false;
      if (result) this.loadProducts();
    });
  }

    
  handleActionClick(event: any): void {
    const target = event.event.target as HTMLElement;

    if (target.classList.contains('edit-icon')) {
      this.openEditProductForm(event.data);
    }

    if (target.classList.contains('delete-icon')) {
      this.deleteProduct(event.data.id, event);
    }
  }

  onSearch(value:string)
  {
    this.loadProducts(value);
  }

  onDemandForecast(value:boolean)
  {
    if(value)
    {
      this.openDemandChart();
      // this.productService.demandForecast();
    }
  }

  openDemandChart()
  {
      const dialog = this.dialog.open(DemandChartComponent, {
      width: '80%',
      height:'700px',
      data: {
        demandData: [
          {
            productName: "Product1",
            demand: { "2020": 125, "2021": 150, "2022": 175 }
          },
          {
            productName: "Product2",
            demand: { "2020": 100, "2021": 120, "2022": 140 }
          }
        ]
      }
    });
  }
}