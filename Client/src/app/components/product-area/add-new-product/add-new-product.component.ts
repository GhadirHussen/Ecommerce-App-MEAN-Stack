import { Component, Input, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product.Model';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators }  from '@angular/forms';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import CategoryModel from 'src/app/models/categoryModel';


@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  public product: ProductModel = new ProductModel();
  public categories: CategoryModel[];
  public productForm: FormGroup;
  public nameControl: FormControl;
  public priceControl: FormControl;
  public stockControl: FormControl;
  public imageControl: FormControl;
  public categoryControl: FormControl;

  public filePreview: any;

  constructor(private productService: ProductService,private http: HttpClient , private myRouter :Router, private acativatedRouter : ActivatedRoute
    ,private MatDialog:MatDialog
  ) {

    this.nameControl = new FormControl(null, [
      Validators.required, Validators.minLength(2), Validators.maxLength(20)])
    this.priceControl = new FormControl(null, [Validators.required, Validators.min(1)]);
    this.stockControl = new FormControl(null, [Validators.required, Validators.min(1)]);
    this.imageControl = new FormControl(null, Validators.required);
    this.categoryControl = new FormControl(null, Validators.required);

    this.productForm = new FormGroup({
      nameControl: this.nameControl,
      priceControl: this.priceControl,
      stockControl: this.stockControl,
      imageControl: this.imageControl,
      categoryControl: this.categoryControl
    });
  }


    async ngOnInit() {
      this.categories = await this.productService.getAllCategories();
    }


  async addProduct(){
        try {
            this.product.name = this.nameControl.value;
            this.product.price = this.priceControl.value;
            this.product.stock = this.stockControl.value;
            this.product.categoryId = this.categoryControl.value;

            await this.productService.addNewProduct(this.product);
            alert('Your new product has been added');
            console.log(this.product);
         
        }
        catch(err) {
            console.log(err)
    }
  }

  
  handelChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
          this.filePreview = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
  }
      
}

  saveImage(event: Event) {
    event.preventDefault();
    this.product.image = (event.target as HTMLInputElement).files;
  }

  close(){
    this.MatDialog.closeAll();
  }

}