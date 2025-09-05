import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  isEditMode: boolean = false;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
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

  ngOnInit(): void {
    if (this.data?.product) {
      this.isEditMode = true;
      this.productId = this.data.product.id;
      this.productForm.patchValue(this.data.product);
    }
  }

  // This handles both add and update depending on mode
  submit(): void {
    if (this.productForm.invalid) return;

    if (this.isEditMode) {
      this.productService.updateProduct(this.productId, this.productForm.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Failed to update product:', err)
      });
    } else {
      this.productService.addProduct(this.productForm.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Failed to add product:', err)
      });
    }
  }

  cancelForm() {
    this.dialogRef.close(false);
  }
}
