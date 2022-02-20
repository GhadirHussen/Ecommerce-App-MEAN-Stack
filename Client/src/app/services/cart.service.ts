import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CartModel from '../models/cart.Model';
import { getCart, CartState, addProductToCart, removeProductFromCart, clearCart } from '../redux/Cart';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import store from '../redux/store';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  


  constructor(private http: HttpClient, private alertService: AlertService, private authService: AuthService) { }
  


  async createCart(data: any){

    const cart =  await this.http.post<CartModel>('http://localhost:3030/api/cart/',data).toPromise();
    store.dispatch(addProductToCart(cart));
    this.alertService.Notyf.success('Your product has been successfully added');
    return cart; 
  }
  

  

  async getCart(){
    // const userId = JSON.parse(localStorage.getItem('user')).id;
    const userId = (await this.authService.getLoginUser()).user._id;
    const cart = await this.http.get<CartModel>(`http://localhost:3030/api/cart/${userId}`).toPromise();
    store.dispatch(getCart(cart)) 
    return store.getState().carts.carts;    
  }


  async deleteProductFromCart(idOfCart:string, idOfItem: string) {

    const productToRemove = await this.http.put(`http://localhost:3030/api/cart/removeItem/${idOfCart}/${idOfItem}`,{}).toPromise()
    const i = store.dispatch(removeProductFromCart(idOfCart,idOfItem))
    this.alertService.NotyfCenter.success('This product has been removed from your cart')

    return productToRemove;
  }

   async clearCart(idOfCart:string) {
    
    if(store.getState().carts.carts.cartItems.length === 0) {
      return this.alertService.NotyfCenter.success('Your cart already cleaning')
    } else {
      const cart = await this.http.put(`http://localhost:3030/api/cart/${idOfCart}/`, {}).toPromise();
      store.dispatch(clearCart(idOfCart));
      this.alertService.NotyfCenter.success('Your cart is clean')
      return cart;
    }
  }
}
