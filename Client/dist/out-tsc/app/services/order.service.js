import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import store from '../redux/store';
import { CreateNewOrder, GetOrderByUser } from '../redux/Order';
let OrderService = class OrderService {
    constructor(http, Router, authService) {
        this.http = http;
        this.Router = Router;
        this.authService = authService;
    }
    async createOrder(order) {
        const newOrder = await this.http.post('http://localhost:3030/api/order/', order).toPromise();
        store.dispatch(CreateNewOrder(newOrder));
        return newOrder;
    }
    async getOrderByUser() {
        const userId = (await this.authService.getLoginUser())._id;
        const order = await this.http.get(`http://localhost:3030/api/order/${userId}`).toPromise();
        if (!order.length) {
            this.Router.navigate(['/store']);
        }
        store.dispatch(GetOrderByUser(order));
        return order;
    }
    async getAllOrders() {
        const orders = await this.http.get(`http://localhost:3030/api/order`).toPromise();
        return orders;
    }
};
OrderService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], OrderService);
export { OrderService };
//# sourceMappingURL=order.service.js.map