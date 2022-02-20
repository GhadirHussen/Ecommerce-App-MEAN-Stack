import { __decorate } from "tslib";
import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
let OrderDetailComponent = class OrderDetailComponent {
    constructor(http, orderService, authService, Router) {
        this.http = http;
        this.orderService = orderService;
        this.authService = authService;
        this.Router = Router;
    }
    async ngOnInit() {
        const userId = (await this.authService.getLoginUser())._id;
        this.order = await this.orderService.getOrderByUser();
        this.http.get(`http://localhost:3030/api/cart/${userId}`)
            .subscribe(res => {
            this.cart = res;
        });
    }
    OrderDonwload() {
        let element = document.getElementById('pdf');
        html2canvas(element).then(canvas => {
            let PDF = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            PDF.addImage(imgData, -50, 0, 320, 140);
            PDF.save('order.pdf');
        });
    }
};
OrderDetailComponent = __decorate([
    Component({
        selector: 'app-order-detail',
        templateUrl: './order-detail.component.html',
        styleUrls: ['./order-detail.component.css']
    })
], OrderDetailComponent);
export { OrderDetailComponent };
//# sourceMappingURL=order-detail.component.js.map