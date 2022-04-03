import { Component, OnInit, Inject  } from '@angular/core';
import ProductModel from 'src/app/models/product.Model';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MatDialog,MAT_DIALOG_DATA , MatDialogRef} from '@angular/material/dialog';
import { AddNewProductComponent } from '../add-new-product/add-new-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { globals } from '../../../../../src/environments/globals';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product: ProductModel;
  public isPopupOpened = true;
  
  currentDialog: MatDialogRef<UpdateProductComponent> = null;
  destroy = new Subject<any>();
 


  constructor(private MatDialog:MatDialog ,private productService: ProductService,private http: HttpClient ,
   private myRouter :Router, private acativatedRouter : ActivatedRoute,
   public dialogRef: MatDialogRef<ProductDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any
   
  ) {}


    async ngOnInit() {
      try{  
        const id = this.acativatedRouter.snapshot.params.id;  
        this.product = await this.http.get<ProductModel>(`${environment.hostUrl}/${globals.productsUrl}/${id}`).toPromise();
        this.ngOnInit();
      }catch(err){
        console.log(err);
      }
    }


    openModal() {
      this.MatDialog.open(AddNewProductComponent)
    }

    async editContact(id: string) {
      this.isPopupOpened = true;
      this.product = await this.http.get<ProductModel>(`${environment.hostUrl}/${globals.productsUrl}/${id}`).toPromise();
      const dialogRef = this.MatDialog.open(UpdateProductComponent, {
        data: this.product,
        panelClass: 'myClass'
      });
    }
}
    







