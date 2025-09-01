import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-table',
  templateUrl: './ag-grid-table.component.html',
  styleUrls: ['./ag-grid-table.component.scss']
})
export class AgGridTableComponent {

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
    minWidth: 100
  };

  onRowClicked(event: any) {
    this.rowClicked.emit(event);
  }

  onCellClicked(event: any) {
    this.cellClicked.emit(event);
  }
}
