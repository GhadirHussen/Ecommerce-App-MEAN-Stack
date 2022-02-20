import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { getCart, addProductToCart, removeProductFromCart, clearCart } from '../redux/Cart';
import store from '../redux/store';
let CartService = class CartService {
    constructor(http, alertService, authService) {
        this.http = http;
        this.alertService = alertService;
        this.authService = authService;
    }
    async getCart() {
        const userId = (await this.authService.getLoginUser())._id;
        let cart = await this.http.get(`http://localhost:3030/api/cart/${userId}`).toPromise();
        store.dispatch(getCart(cart));
        return store.getState().carts.carts;
    }
    async createCart(data) {
        const cart = await this.http.post('http://localhost:3030/api/cart/', data).toPromise();
        store.dispatch(addProductToCart(cart));
        this.alertService.Notyf.success('Your product has been successfully added');
        return cart;
    }
    async deleteProductFromCart(idOfCart, idOfItem) {
        const productToRemove = await this.http.put(`http://localhost:3030/api/cart/removeItem/${idOfCart}/${idOfItem}`, {}).toPromise();
        const i = store.dispatch(removeProductFromCart(idOfCart, idOfItem));
        console.log(i);
        this.alertService.NotyfCenter.success('This product has been removed from your cart');
        return productToRemove;
    }
    async clearCart(idOfCart) {
        if (store.getState().carts.carts.cartItems.length === 0) {
            return this.alertService.NotyfCenter.success('Your cart already cleaning');
        }
        else {
            const cart = await this.http.put(`http://localhost:3030/api/cart/${idOfCart}/`, {}).toPromise();
            store.dispatch(clearCart(idOfCart));
            this.alertService.NotyfCenter.success('Your cart is clean');
            return cart;
        }
    }
};
CartService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CartService);
export { CartService };
//# sourceMappingURL=cart.service.js.map