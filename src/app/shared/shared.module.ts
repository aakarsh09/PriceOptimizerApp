import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavbarComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,

  ],
  exports:[
    ToolbarComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
