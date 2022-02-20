import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddNewProductComponent } from '../add-new-product/add-new-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { Subject } from 'rxjs';
let ProductDetailsComponent = class ProductDetailsComponent {
    constructor(MatDialog, productService, http, myRouter, acativatedRouter, dialogRef, data) {
        this.MatDialog = MatDialog;
        this.productService = productService;
        this.http = http;
        this.myRouter = myRouter;
        this.acativatedRouter = acativatedRouter;
        this.dialogRef = dialogRef;
        this.data = data;
        this.isPopupOpened = true;
        this.currentDialog = null;
        this.destroy = new Subject();
    }
    async ngOnInit() {
        try {
            const id = this.acativatedRouter.snapshot.params.id;
            this.product = await this.http.get('http://localhost:3030/api/products/' + id).toPromise();
            this.ngOnInit();
        }
        catch (err) {
            console.log(err);
        }
    }
    openModal() {
        this.MatDialog.open(AddNewProductComponent);
    }
    async editContact(id) {
        this.isPopupOpened = true;
        this.product = await this.http.get('http://localhost:3030/api/products/' + id).toPromise();
        const dialogRef = this.MatDialog.open(UpdateProductComponent, {
            data: this.product,
            panelClass: 'myClass'
        });
    }
};
ProductDetailsComponent = __decorate([
    Component({
        selector: 'app-product-details',
        templateUrl: './product-details.component.html',
        styleUrls: ['./product-details.component.css']
    }),
    __param(6, Inject(MAT_DIALOG_DATA))
], ProductDetailsComponent);
export { ProductDetailsComponent };
//# sourceMappingURL=product-details.component.js.map