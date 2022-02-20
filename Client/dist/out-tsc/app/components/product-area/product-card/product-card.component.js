import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { UpdateProductComponent } from '../update-product/update-product.component';
let ProductCardComponent = class ProductCardComponent {
    constructor(matDialog, http, route, ProductsService, Router, auth, cartService) {
        this.matDialog = matDialog;
        this.http = http;
        this.route = route;
        this.ProductsService = ProductsService;
        this.Router = Router;
        this.auth = auth;
        this.cartService = cartService;
        this.isPopupOpened = true;
        this.checkAdmin = false;
        this.url = 'http://localhost:3030/api/categories/';
    }
    async ngOnInit() {
        try {
            this.user = await this.auth.getLoginUser();
            this.checkAdmin = this.user.isAdmin;
        }
        catch (err) {
            console.log(err);
        }
    }
    open() {
        this.matDialog.open(ProductDetailsComponent, {
            data: this.product,
            maxHeight: '100%',
            maxWidth: '100%'
        });
    }
    async editProduct(id) {
        this.isPopupOpened = true;
        this.product = await this.http.get('http://localhost:3030/api/products/' + id).toPromise();
        const dialogRef = this.matDialog.open(UpdateProductComponent, {
            data: this.product
        });
    }
    async addToCart(id) {
        const userId = (await this.auth.getLoginUser())._id;
        const data = {
            user: userId,
            cartItems: [{
                    product: id,
                    quantity: this.quantity,
                }],
        };
        this.cart = await this.cartService.createCart(data);
        localStorage.setItem('MyCart', JSON.stringify(this.cart));
    }
    amount(event) {
        this.quantity = event.target.value;
    }
};
__decorate([
    Input()
], ProductCardComponent.prototype, "product", void 0);
__decorate([
    Input()
], ProductCardComponent.prototype, "products", void 0);
__decorate([
    Input()
], ProductCardComponent.prototype, "i", void 0);
__decorate([
    Input()
], ProductCardComponent.prototype, "isPopupOpened", void 0);
ProductCardComponent = __decorate([
    Component({
        selector: 'app-product-card',
        templateUrl: './product-card.component.html',
        styleUrls: ['./product-card.component.css']
    })
], ProductCardComponent);
export { ProductCardComponent };
//# sourceMappingURL=product-card.component.js.map