import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import ProductModel from 'src/app/models/product.Model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let UpdateProductComponent = class UpdateProductComponent {
    constructor(productService, http, myRouter, acativatedRouter, matDialog, dialogRef, data) {
        this.productService = productService;
        this.http = http;
        this.myRouter = myRouter;
        this.acativatedRouter = acativatedRouter;
        this.matDialog = matDialog;
        this.dialogRef = dialogRef;
        this.data = data;
        this.product = new ProductModel();
        this.handelChange = (event) => {
            if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();
                reader.onload = (event) => {
                    this.filePreview = event.target.result;
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        };
        try {
            this.product.id = data.id;
            this.http.get('http://localhost:3030/api/products' + "/" + this.product.id)
                .subscribe((res) => {
                this.nameControl.setValue(res.name);
                this.priceControl.setValue(res.price);
                this.stockControl.setValue(res.stock);
                this.categoryControl.setValue(res.categoryId);
                this.productImage = res.imageName;
            });
        }
        catch (err) {
            console.log(err);
        }
        this.nameControl = new FormControl(null, Validators.required);
        this.priceControl = new FormControl(null, Validators.required);
        this.stockControl = new FormControl(null, Validators.required);
        this.imageControl = new FormControl();
        this.categoryControl = new FormControl(null, Validators.required);
        this.productForm = new FormGroup({
            nameControl: this.nameControl,
            priceControl: this.priceControl,
            stockControl: this.stockControl,
            imageControl: this.imageControl
        });
    }
    async ngOnInit() {
        this.categories = await this.productService.getAllCategories();
    }
    async update() {
        try {
            this.product.name = this.nameControl.value;
            this.product.price = this.priceControl.value;
            this.product.stock = this.stockControl.value;
            this.product.categoryId = this.categoryControl.value;
            await this.productService.updateProduct(this.product);
            alert(`Your product with id ${this.product.id} has been updated`);
        }
        catch (err) {
            console.log(err);
        }
    }
    saveImage(event) {
        event.preventDefault();
        this.product.image = event.target.files;
        if (!this.product.image) {
            this.filePreview;
        }
    }
};
UpdateProductComponent = __decorate([
    Component({
        selector: 'app-update-product',
        templateUrl: './update-product.component.html',
        styleUrls: ['./update-product.component.css']
    }),
    __param(6, Inject(MAT_DIALOG_DATA))
], UpdateProductComponent);
export { UpdateProductComponent };
//# sourceMappingURL=update-product.component.js.map