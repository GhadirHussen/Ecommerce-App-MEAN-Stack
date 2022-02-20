import { Component, Input, OnInit} from '@angular/core';
import ProductModel from 'src/app/models/product.Model';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { AuthService } from 'src/app/services/auth.service';
import UserModel from 'src/app/models/user.Model';
import CartModel from 'src/app/models/cart.Model';
import { CartService } from 'src/app/services/cart.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { AlertService } from 'src/app/services/alert.service';




@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input()
  public product: ProductModel;

  @Input()
  public products: ProductModel[];
 
  @Input()
  public i: number;

  @Input()
  public isPopupOpened = true;

  public cart: CartModel;
  public qun: number;
  public add: string;
  public quantity: number;
  public user: any;
  public checkAdmin: boolean = false;
  public item:any;

  public url = 'http://localhost:3030/api/categories/';

  public errors: any;


  constructor(private matDialog:MatDialog, private http:HttpClient,private route: ActivatedRoute
    ,private ProductsService: ProductService, private Router: Router,
    public authService: AuthService, public cartService: CartService, private ErrorsService: ErrorsService, private alerService: AlertService
  ){
 
  }

  async ngOnInit() {
      try {
        this.user = (await this.authService.getLoginUser()).user;
        this.checkAdmin = this.user.isAdmin;
      } catch(err) {
        console.log(err);
      }
  }


  open () {

    this.matDialog.open(ProductDetailsComponent, {
        data: this.product,
        maxHeight: '100%',
        maxWidth: '100%'
    });
  }

  async editProduct(id: string) {
    this.isPopupOpened = true;
    this.product = await this.http.get<ProductModel>('http://localhost:3030/api/products/' + id ).toPromise();
    const dialogRef = this.matDialog.open(UpdateProductComponent, {
      data: this.product
    });
  }



  async addToCart(id: string) {

    const userId = (await this.authService.getLoginUser()).user._id;
    // const userId = JSON.parse(localStorage.getItem('user')).id;

    try {
      const data = {
        user: userId,
        cartItems: [{
          product: id, 
          quantity: this.quantity,
        }],
      }
      this.cart = await this.cartService.createCart(data);
      localStorage.setItem('MyCart', JSON.stringify(this.cart))
    } catch(err) {
      this.ErrorsService.handelErrors = err;
      this.alerService.Notyf.error(this.ErrorsService.handelErrors.error.message);
    }
    
  } 



  amount(event: any) {

    this.quantity = event.target.value;
  }

}
