import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { GetCartComponent } from '../../cart-area/get-cart/get-cart.component';
let HeaderComponent = class HeaderComponent {
    constructor(AuthService, http, route, ProductsService, matDialog, cartService, Router, alertService) {
        this.AuthService = AuthService;
        this.http = http;
        this.route = route;
        this.ProductsService = ProductsService;
        this.matDialog = matDialog;
        this.cartService = cartService;
        this.Router = Router;
        this.alertService = alertService;
        this.totalItem = 0;
    }
    async ngOnInit() {
        try {
            this.categories = await this.ProductsService.getAllCategories();
            this.cart = await this.cartService.getCart();
            if (localStorage.getItem('MyCart') != null) {
                this.alertService.NotyfCenterOrder.success('Hi you have a safe shopping cart that you have not yet placed an order');
            }
        }
        catch (err) {
        }
    }
    logOut() {
        this.AuthService.logout();
    }
    opentCart() {
        this.matDialog.open(GetCartComponent, {
            data: this.cart,
            width: "50%",
            height: "50%",
            panelClass: "cart"
        });
    }
    closeCart() {
        this.matDialog.closeAll();
    }
};
HeaderComponent = __decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.css']
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map