import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import OrderModel from 'src/app/models/order.Model';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
let OrderComponent = class OrderComponent {
    constructor(http, authService, cartService, Router, dialog, orderService, alertService) {
        this.http = http;
        this.authService = authService;
        this.cartService = cartService;
        this.Router = Router;
        this.dialog = dialog;
        this.orderService = orderService;
        this.alertService = alertService;
        this.shippingDate = new Date().toLocaleString();
        this.newOrder = new OrderModel();
        this.isOptional = false;
        this.firstNameControl = new FormControl(null, [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10)
        ]);
        this.lastNameControl = new FormControl(null, [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10)
        ]);
        this.cardNumberControl = new FormControl(null, [
            Validators.required,
            Validators.minLength(15),
            Validators.maxLength(16),
            Validators.min(1)
        ]);
        this.monthControl = new FormControl(null, [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(2),
            Validators.min(0)
        ]);
        this.yearControl = new FormControl(null, [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(4),
            Validators.min(2)
        ]);
        this.cvvControl = new FormControl(null, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(3),
            Validators.min(0)
        ]);
        this.shippingDateControl = new FormControl(null, [
            Validators.required,
            Validators.min(this.shippingDate)
        ]);
        this.orderFormGroup = new FormGroup({
            firstNameControl: this.firstNameControl,
            lastNameControl: this.lastNameControl,
            shippingDateControl: this.shippingDateControl
        });
        this.pymentGroup = new FormGroup({
            cardNumberControl: this.cardNumberControl,
            monthControl: this.monthControl,
            yearControl: this.yearControl,
            cvvControl: this.cvvControl
        });
    }
    async ngOnInit() {
        this.cart = await this.cartService.getCart();
        this.orders = await this.orderService.getAllOrders();
        this.orderSecondTime();
    }
    async orderNow(userId, cartId) {
        this.newOrder.firstName = this.firstNameControl.value;
        this.newOrder.lastName = this.lastNameControl.value;
        this.newOrder.cardNumber = this.cardNumberControl.value;
        this.newOrder.month = this.monthControl.value;
        this.newOrder.year = this.yearControl.value;
        this.newOrder.cvv = this.cvvControl.value;
        this.newOrder.shippingDate = this.shippingDateControl.value;
        this.newOrder.userId = userId;
        this.newOrder.cartId = cartId;
        try {
            ////get the length of the same shipping date;
            const countOrdersWithSameDate = this.orders.filter((obj) => obj.shippingDate === this.shippingDateControl.value).length;
            ///Check if there are more than 3 same delivery dates if true have to get another date
            if (countOrdersWithSameDate === 3) {
                this.alertService.NotyfCenterOrder.error('Oop we have more than 3 orders in this day please choose another day');
                return;
            }
            this.newOrder = await this.orderService.createOrder(this.newOrder);
            localStorage.removeItem('MyCart');
            Swal.fire({
                title: 'Your order has been successfully placed',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
            this.Router.navigateByUrl('store/order/orderDetails');
        }
        catch (err) {
            console.log(err);
        }
    }
    ////Check if the cuurent user have order or not if yes ask him if he want to order again;
    async orderSecondTime() {
        const currentUser = (await this.authService.getLoginUser())._id;
        const check_orders_for_currentUser = this.orders.filter((obj) => obj.userId === currentUser).length;
        if (check_orders_for_currentUser > 0) {
            Swal.fire({
                title: `You already have ${check_orders_for_currentUser} orders you want to order again ?`,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            }).then((result) => {
                if (result.isConfirmed) {
                    return null;
                }
                else {
                    this.Router.navigateByUrl('/store');
                }
            });
        }
    }
};
OrderComponent = __decorate([
    Component({
        selector: 'app-order',
        templateUrl: './order.component.html',
        styleUrls: ['./order.component.css']
    })
], OrderComponent);
export { OrderComponent };
//# sourceMappingURL=order.component.js.map