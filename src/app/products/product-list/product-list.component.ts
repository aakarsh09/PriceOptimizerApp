import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  columnDefs: ColDef[] = [];
  rowData: any[] = [];

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

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        const customWidths: { [key: string]: number } = {
          description: 300,
          name: 200,
          category: 180
        };

        // Map columns and assign widths and styles
        const enhancedColumns = data.columns.map(col => ({
          ...col,
          width: customWidths[col.field] ?? 120,
          wrapText: true,
          autoHeight: true,
          cellClass: 'left-align'
        }));

        // Prepend the checkbox column here
        this.columnDefs = [this.checkboxColumn, ...enhancedColumns];
        this.rowData = data.rows;
      },
      error: (err) => console.error('Error loading products:', err)
    });
  }

  handleRowClick(event: any) {
    console.log('Row clicked:', event.data);
  }
}
