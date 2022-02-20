import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProductListComponent = class ProductListComponent {
    constructor(Headers, ProductsService, http, route, AuthService) {
        this.Headers = Headers;
        this.ProductsService = ProductsService;
        this.http = http;
        this.route = route;
        this.AuthService = AuthService;
    }
    async ngOnInit() {
        try {
            this.products = await this.ProductsService.getAllProducts();
            this.route.params.subscribe(() => {
                this.catId = this.route.snapshot.paramMap.get('id');
                if (this.catId === null) {
                    this.products;
                    return;
                }
                this.ProductsService.getProductByCategoryId(this.catId).subscribe((data) => {
                    this.products = data;
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    async searchProduct(event) {
        try {
            const keyWord = event.target.value;
            if (!keyWord)
                this.ngOnInit();
            this.products = await this.ProductsService.searchProduct(keyWord);
        }
        catch (err) {
            console.log(err);
        }
    }
};
ProductListComponent = __decorate([
    Component({
        selector: 'app-product-list',
        templateUrl: './product-list.component.html',
        styleUrls: ['./product-list.component.css']
    })
], ProductListComponent);
export { ProductListComponent };
//# sourceMappingURL=product-list.component.js.map