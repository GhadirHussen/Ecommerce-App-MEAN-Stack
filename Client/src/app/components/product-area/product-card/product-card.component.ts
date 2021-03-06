import { Component, Input} from '@angular/core';
import ProductModel from 'src/app/models/product.Model';
import {MatDialog} from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { HttpClient } from '@angular/common/http';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { AuthService } from 'src/app/services/auth.service';
import CartModel from 'src/app/models/cart.Model';
import { CartService } from 'src/app/services/cart.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from '../../../../environments/environment';
import { globals } from '../../../../../src/environments/globals';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input()
  public product: ProductModel;

  // @Input()
  // public products: ProductModel[];
 
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
  public count: any;

  constructor(private matDialog:MatDialog, private http:HttpClient,
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
    this.product = await this.http.get<ProductModel>(`${environment.hostUrl}/${globals.productsUrl}/${id}`).toPromise();
    this.matDialog.open(UpdateProductComponent, {
      data: this.product
    });
  }



  async addToCart(id: string) {

    const userId = (await this.authService.getLoginUser()).user._id;
    try {

      const data = {
        user: userId,
        cartItems: [{
          product: id, 
          quantity: this.quantity,
        }],
      }

      this.cart = await this.cartService.createCart(data);

      localStorage.setItem('MyCart', JSON.stringify(this.cart));

      this.count = this.cart;

      /* send the length cartItems in each click to the header cart icon */
      this.cartService.countItems.next(this.count.Cart.cartItems.length +1);
      

    } catch(err) {
      this.ErrorsService.handelErrors = err;
      this.alerService.Notyf.error(this.ErrorsService.handelErrors.error.message);
    }
    
  } 

 

  amount(event: any) {

    this.quantity = event.target.value;
  }

}
