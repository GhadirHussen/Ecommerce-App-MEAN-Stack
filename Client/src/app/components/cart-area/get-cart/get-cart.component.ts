import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterPreloader } from '@angular/router';
import CartModel from 'src/app/models/cart.Model';
import OrderModel from 'src/app/models/order.Model';
import ProductModel from 'src/app/models/product.Model';
import { updateProductFromCart } from 'src/app/redux/Cart';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { AlertService } from 'src/app/services/alert.service';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-get-cart',
  templateUrl: './get-cart.component.html',
  styleUrls: ['./get-cart.component.css']
})
export class GetCartComponent implements OnInit {
  
  public cart: CartModel;
  public totalPrice: number = 0;
  public quantity: number = 1;
  public order: OrderModel;
  public product: ProductModel;

  public userId: any;

  constructor(private http: HttpClient, private matDialog: MatDialog, private CartService: CartService,
    private authService: AuthService ,private Router: Router, private alertService: AlertService, private orderService: OrderService) 
    {}


  async ngOnInit() {
    this.cart = await this.CartService.getCart();
  }

  ///Update one product from the cart
  async update(idOfCart:string, idOfProduct: string) {

    const data = {
      "cartItems": [
        {
          product: idOfProduct,
          quantity: +this.quantity,
        }
      ]
    };
    
    await this.http.put(`http://localhost:3030/api/cart/${idOfCart}/${idOfProduct}`, data).toPromise()
    store.dispatch(updateProductFromCart(idOfCart, idOfProduct));
    this.alertService.NotyfCenter.success('Your product has been successfully updated');
    this.ngOnInit();
  }

  
  amount(event: any) {

    this.quantity = event.target.value
    console.log(event.target.value);
  }

  closeCart () {
    this.matDialog.closeAll();
  }

  
  ///Remove one product form the cart
  async removeItem(idOfCart:string, idOfItem: string) {
    await this.CartService.deleteProductFromCart(idOfCart,idOfItem)
    this.ngOnInit();
  }

  ///Delete all the products from the cart
  async clearCart(idOfCart:string) {
    await this.CartService.clearCart(idOfCart);
    this.ngOnInit();
  }


}
 