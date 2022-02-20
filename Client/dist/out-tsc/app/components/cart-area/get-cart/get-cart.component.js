import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { updateProductFromCart } from 'src/app/redux/Cart';
import store from 'src/app/redux/store';
let GetCartComponent = class GetCartComponent {
    constructor(http, matDialog, CartService, authService, Router, alertService, orderService) {
        this.http = http;
        this.matDialog = matDialog;
        this.CartService = CartService;
        this.authService = authService;
        this.Router = Router;
        this.alertService = alertService;
        this.orderService = orderService;
        this.totalPrice = 0;
        this.quantity = 1;
    }
    async ngOnInit() {
        this.cart = await this.CartService.getCart();
    }
    ///Update one product from the cart
    async update(idOfCart, idOfProduct) {
        const data = {
            "cartItems": [
                {
                    product: idOfProduct,
                    quantity: +this.quantity,
                }
            ]
        };
        await this.http.put(`http://localhost:3030/api/cart/${idOfCart}/${idOfProduct}`, data).toPromise();
        store.dispatch(updateProductFromCart(idOfCart, idOfProduct));
        this.alertService.NotyfCenter.success('Your product has been successfully updated');
        this.ngOnInit();
    }
    amount(event) {
        this.quantity = event.target.value;
        console.log(event.target.value);
    }
    closeCart() {
        this.matDialog.closeAll();
    }
    ///Remove one product form the cart
    async removeItem(idOfCart, idOfItem) {
        await this.CartService.deleteProductFromCart(idOfCart, idOfItem);
        this.ngOnInit();
    }
    ///Delete all the products from the cart
    async clearCart(idOfCart) {
        await this.CartService.clearCart(idOfCart);
        this.ngOnInit();
    }
};
GetCartComponent = __decorate([
    Component({
        selector: 'app-get-cart',
        templateUrl: './get-cart.component.html',
        styleUrls: ['./get-cart.component.css']
    })
], GetCartComponent);
export { GetCartComponent };
//# sourceMappingURL=get-cart.component.js.map