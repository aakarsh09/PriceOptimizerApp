import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { GridReadyEvent } from 'ag-grid-community';

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
  @Output() gridReady = new EventEmitter<GridReadyEvent>();

  
  defaultColDef: ColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  flex: 1,
  minWidth: 80,
  wrapText: true,
  autoHeight: true
};


  onRowClicked(event: any) {
    this.rowClicked.emit(event);
  }

  onCellClicked(event: any) {
    this.cellClicked.emit(event);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridReady.emit(params);
  }
}
