import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ColDef } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  columnDefs: ColDef[] = [];
  rowData: any[] = [];
  uniqueCategories:string[]=[];
  filteredRowData: any[] = [];

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
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
      this.loadProducts();
  }


  loadProducts(){
    this.productService.getProducts().subscribe({
      next: (data) => {
        const customWidths: { [key: string]: number } = {
          description: 300,
          name: 200,
          category: 180
        };

        // Map columns and assign widths and styles
        const enhancedColumns = data.columns.map(col => {
          let flexValue = 1;

          if (['description'].includes(col.field)) flexValue = 3;
          else if (['name'].includes(col.field)) flexValue = 2;
          else if (['category'].includes(col.field)) flexValue = 1.5;
          return {
            ...col,
            flex: flexValue,
            wrapText: true,
            autoHeight: true,
            cellClass: 'left-align'
          };
        });
        
        // checkbox column addedhere
        this.columnDefs = [this.checkboxColumn, ...enhancedColumns];
        this.rowData = data.rows;
        this.filteredRowData = data.rows;

        const allCategories = data.rows.map(row => row.category);
        this.uniqueCategories = [...new Set(allCategories)];
      },
      error: (err) => console.error('Error loading products:', err)
    });
  }

  openAddProductForm(event:any) {
    if(event == true)
    {
      const dialogRef = this.dialog.open(ProductFormComponent, {
        width: '600px',
        disableClose: true,
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
}