import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private productService: ProductsService,
    private dialogRef: MatDialogRef<ProductFormComponent>) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      cost_price: ['', [Validators.required, Validators.min(0)]],
      selling_price: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      stock_available: ['', [Validators.required, Validators.min(0)]],
      units_sold: ['', [Validators.required, Validators.min(0)]]
    });
  }

  submit() {
  if (this.productForm.valid) {
    this.productService.addProduct(this.productForm.value).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
      },
      error: (err) => console.error('Failed to add product:', err)
    });
  }
}


  cancelForm() {
    this.dialogRef.close(false);
  }
}
