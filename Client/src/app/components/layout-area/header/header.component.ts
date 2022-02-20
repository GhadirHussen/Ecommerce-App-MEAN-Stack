import { style } from '@angular/animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import CartModel from 'src/app/models/cart.Model';
import CategoryModel from 'src/app/models/categoryModel';
import ProductModel from 'src/app/models/product.Model';
import UserModel from 'src/app/models/user.Model';
import { getCart } from 'src/app/redux/Cart';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { GetCartComponent } from '../../cart-area/get-cart/get-cart.component';
import { ProductDetailsComponent } from '../../product-area/product-details/product-details.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
}) 
export class HeaderComponent implements OnInit{

  public categories : CategoryModel[];
  public cart: CartModel;
  public totalItem : number = 0;
  public Name: string;
  public myInterval: any;
  public subscription: Subscription;


  

  constructor(
    public AuthService: AuthService,
    private http: HttpClient ,private route: ActivatedRoute ,
    private ProductsService:ProductService,
    private matDialog:MatDialog,
    private CartService: CartService,
    public Router: Router,
    private alertService: AlertService
  ) { }

   
 
  async ngOnInit() {
    try {

      this.categories = await this.ProductsService.getAllCategories();
      this.cart = await this.CartService.getCart();
      if(localStorage.getItem('MyCart') != null) {
        this.alertService.NotyfCenterOrder.success('Hi you have a safe shopping cart that you have not yet placed an order')
      } 
    } catch(err) {

    }

  } 



  // logout() {
  //   this.AuthService.logout();
  // }


  opentCart() {
    this.matDialog.open(GetCartComponent, {
      data: this.cart,
      width: "50%",
      height: "50%",
      panelClass: "cart"
     });

  }

  closeCart () {
    this.matDialog.closeAll();
  }
}

