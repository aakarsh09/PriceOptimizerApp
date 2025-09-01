import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-table',
  templateUrl: './ag-grid-table.component.html',
  styleUrls: ['./ag-grid-table.component.scss']
})
export class AgGridTableComponent implements OnInit {

  @Input() columnDefs: ColDef[] = [];
  @Input() rowData: any[] = [];

  @Input() gridOptions?: GridOptions;
  @Input() rowSelection: 'single' | 'multiple' = 'multiple';

  @Output() rowClicked = new EventEmitter<any>();
  @Output() cellClicked = new EventEmitter<any>();

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 100
  };

  ngOnInit() {
    console.log('ColumnDefs:', this.columnDefs);
    console.log('RowData:', this.rowData);

    // Inject checkbox column at the start
    const checkboxColumn: ColDef = {
      headerName: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 50,
      pinned: 'left'
    };

    // Only inject if not already present
    if (!this.columnDefs.some(col => col.checkboxSelection)) {
      this.columnDefs = [checkboxColumn, ...this.columnDefs];
    }
  }

  onRowClicked(event: any) {
    this.rowClicked.emit(event);
  }

  onCellClicked(event: any) {
    this.cellClicked.emit(event);
  }
}
