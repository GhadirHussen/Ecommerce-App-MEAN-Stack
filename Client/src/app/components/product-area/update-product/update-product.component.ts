import { Component, Input, OnInit ,Inject} from '@angular/core';
import ProductModel from 'src/app/models/product.Model';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators }  from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import CategoryModel from 'src/app/models/categoryModel';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  public product: ProductModel = new ProductModel();
  public categories: CategoryModel[];

  public productForm: FormGroup;
  public nameControl: FormControl;
  public priceControl: FormControl;
  public stockControl: FormControl;
  public imageControl: FormControl;
  public categoryControl: FormControl;
  public productImage: string;
  public filePreview: any;
  public errors: any;
  

  constructor(private productService: ProductService,private http: HttpClient ,
    private myRouter :Router, private acativatedRouter : ActivatedRoute,
    private matDialog:MatDialog,
    public dialogRef: MatDialogRef<UpdateProductComponent>, @Inject(MAT_DIALOG_DATA) public data: any

  )
  {
  

    try{
      this.product.id = data.id;
      this.http.get<ProductModel[]>('http://localhost:3030/api/products' + "/" +    this.product.id )
        .subscribe((res: any) => {
          this.nameControl.setValue(res.name);
          this.priceControl.setValue(res.price);
          this.stockControl.setValue(res.stock);
          this.categoryControl.setValue(res.categoryId);
          this.productImage = res.imageName;
        });
    }catch(err){
      console.log(err)
    }


    this.nameControl = new FormControl(null, Validators.required);
    this.priceControl = new FormControl(null, Validators.required);
    this.stockControl = new FormControl(null, Validators.required);
    this.imageControl = new FormControl();
    this.categoryControl = new FormControl(null, Validators.required);


    this.productForm = new FormGroup({
      nameControl: this.nameControl,
      priceControl: this.priceControl,
      stockControl: this.stockControl,
      imageControl: this.imageControl
    });
  }


  async ngOnInit() {
    this.categories = await this.productService.getAllCategories();
  }




  async update(){
      try {
        this.product.name = this.nameControl.value;
        this.product.price = this.priceControl.value;
        this.product.stock = this.stockControl.value;
        this.product.categoryId = this.categoryControl.value;
        await this.productService.updateProduct(this.product);
        alert(`Your product with id ${this.product.id} has been updated`);
      }
      catch(err) {
        console.log(err);
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
    if(!this.product.image) {
      this.filePreview
    }
  }

}

