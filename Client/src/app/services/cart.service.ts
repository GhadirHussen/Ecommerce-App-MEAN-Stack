import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CartModel from '../models/cart.Model';
import { getCart, addProductToCart, removeProductFromCart, clearCart, updateProductFromCart } from '../redux/Cart';
import store from '../redux/store';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { globals } from 'src/environments/globals';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  public countItems = new BehaviorSubject<any>([]);
  public resetCountItems = new BehaviorSubject<any>(null);
  public newCountItems = new BehaviorSubject<any>(null);

  
  constructor(private http: HttpClient, private alertService: AlertService, private authService: AuthService) { }
  


  async createCart(data: any){
    const cart =  await this.http.post<CartModel>(`${environment.hostUrl}/${globals.cartUrl}`, data).toPromise();
    store.dispatch(addProductToCart(cart));
    this.alertService.Notyf.success('Your product has been successfully added');
    return cart; 
  }
  

  

  async getCart(){
    const userId = (await this.authService.getLoginUser()).user.id;
    const cart = await this.http.get<CartModel>(`${environment.hostUrl}/${globals.cartUrl}/${userId}`).toPromise();
    store.dispatch(getCart(cart)) 
    return store.getState().carts.carts;    
  }


    ///Update one product from the cart
    async updateItem(idOfCart:string, idOfProduct: string, data: object) {
 
      await this.http.put(`${environment.hostUrl}/${globals.cartUrl}/${idOfCart}/${idOfProduct}`, data).toPromise()
      store.dispatch(updateProductFromCart(idOfCart, idOfProduct));
      this.alertService.NotyfCenter.success('Your product has been successfully updated');
      return;
    }


  async deleteProductFromCart(idOfCart:string, idOfItem: string) {
    const productToRemove = await this.http.put(`${environment.hostUrl}/${globals.cartUrl}/removeItem/${idOfCart}/${idOfItem}`, {}).toPromise()
    const i = store.dispatch(removeProductFromCart(idOfCart,idOfItem))
    this.alertService.NotyfCenter.success('This product has been removed from your cart')

    return productToRemove;
  }

   async clearCart(idOfCart:string) {
    
    if(store.getState().carts.carts.cartItems.length === 0) {
      return this.alertService.NotyfCenter.success('Your cart already cleaning')
    } else {
      const cart = await this.http.put(`${environment.hostUrl}/${globals.cartUrl}/${idOfCart}/`, {}).toPromise();
      store.dispatch(clearCart(idOfCart));
      this.alertService.NotyfCenter.success('Your cart is clean')
      return cart;
    }
  }
}
