import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  ngOnInit(): void {
    
  }
  
  columnDefs = [
  { headerName: 'Name', field: 'productName' },
  { headerName: 'Category', field: 'category' },
  { headerName: 'Price', field: 'price' },
  
];

rowData = [
  { productName: 'Notebook', category: 'Stationery', price: '$2.5' },
  { productName: 'Sticky Notes', category: 'Stationery', price: '$1.5' },
];

handleRowClick(event: any) {
  console.log('Row clicked:', event.data);
}
}
