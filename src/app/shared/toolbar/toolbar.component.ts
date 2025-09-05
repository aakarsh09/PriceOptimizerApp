import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() showToolBar: boolean = false;
  @Input() categoryOptions: string[] = [];

  @Output() isAddProducts = new EventEmitter<boolean>();
  @Output() categoryChanged = new EventEmitter<string | undefined>();
  @Output() searchValue = new EventEmitter<string>();
  searchTerm:string = "";

  categoryControl: FormControl = new FormControl('');

  constructor(private router: Router){}
  ngOnInit() {
    this.categoryControl.valueChanges.subscribe((value: string | null) => {
      this.categoryChanged.emit(value ?? undefined);
    });
  }

  addProductsEmitter() {
    this.isAddProducts.emit(true);
  }

  onSearch()
  {
    this.searchValue.emit(this.searchTerm);
  }
  onback()
  {
    console.log("backcalled")
    this.router.navigate(['/dashboard']);
  }
}
