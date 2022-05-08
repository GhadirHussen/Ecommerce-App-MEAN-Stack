import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChildActivationStart } from '@angular/router';
import CartModel from 'src/app/models/cart.Model';
import OrderModel from 'src/app/models/order.Model';
import ProductModel from 'src/app/models/product.Model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';


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


  constructor(private matDialog: MatDialog, private CartService: CartService) {}
    

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
    
    await this.CartService.updateItem(idOfCart, idOfProduct, data);
    this.ngOnInit();
  }

  
  amount(event: any) {
    this.quantity = event.target.value;
  }

  closeCart () {
    this.matDialog.closeAll();
  }

  
  ///Remove one product form the cart
  async removeItem(idOfCart:string, idOfItem: string) {
    await this.CartService.deleteProductFromCart(idOfCart,idOfItem);

    this.CartService.countItems.next(this.cart.cartItems.length);

    if(this.cart.cartItems.length === 0) return localStorage.removeItem("MyCart");

    this.ngOnInit();
  }

  ///Delete all the products from the cart
  async clearCart(idOfCart:string) {
    await this.CartService.clearCart(idOfCart);
    this.CartService.countItems.next(this.cart.cartItems.length);
    localStorage.removeItem("MyCart");
    this.ngOnInit();
  }


}
 