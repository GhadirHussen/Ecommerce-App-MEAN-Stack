import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { productsDownloadedAction, productAddedAction, productUpdatedAction } from '../redux/Products';
import { CategoriesDownloadedAction } from '../redux/Categories';
import ProductModel from '../models/product.Model';
import store from '../redux/store';
import { Subject } from 'rxjs';
let ProductService = class ProductService {
    constructor(http) {
        this.http = http;
        this._refresh$ = new Subject();
    }
    get refresh$() {
        return this._refresh$;
    }
    async getAllProducts() {
        if (store.getState().products.products.length === 0) {
            const products = await this.http.get('http://localhost:3030/api/products').toPromise();
            store.dispatch(productsDownloadedAction(products));
        }
        return store.getState().products.products;
    }
    async getOneProduct(id) {
        if (store.getState().products.products.length === 0) {
            const products = await this.http.get('http://localhost:3030/api/products').toPromise();
            store.dispatch(productsDownloadedAction(products));
        }
        const product = store.getState().products.products.find(p => p.id === id);
        return product;
    }
    async searchProduct(keyWord) {
        const product = await this.http.get(`http://localhost:3030/api/products/search/${keyWord}`).toPromise();
        return product;
    }
    async addNewProduct(product) {
        const myFormData = ProductModel.convertToFormData(product);
        const addProduct = await this.http.post('http://localhost:3030/api/products', myFormData).toPromise();
        store.dispatch(productAddedAction(addProduct));
        return addProduct;
    }
    async updateProduct(product) {
        const myFormData = ProductModel.convertToFormData(product);
        const updatedProduct = await this.http.put('http://localhost:3030/api/products/' + product.id, myFormData).toPromise();
        store.dispatch(productUpdatedAction(updatedProduct));
        return updatedProduct;
    }
    async getAllCategories() {
        if (store.getState().categories.categories.length === 0) {
            const categories = await this.http.get('http://localhost:3030/api/categories/').toPromise();
            store.dispatch(CategoriesDownloadedAction(categories));
        }
        return store.getState().categories.categories;
    }
    getProductByCategoryId(id) {
        const product = this.http.get("http://localhost:3030/api/categories/" + id);
        return product;
    }
};
ProductService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProductService);
export { ProductService };
//# sourceMappingURL=product.service.js.map