import { __decorate } from "tslib";
import { Component } from '@angular/core';
import ProductModel from 'src/app/models/product.Model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
let AddNewProductComponent = class AddNewProductComponent {
    constructor(productService, http, myRouter, acativatedRouter, MatDialog) {
        this.productService = productService;
        this.http = http;
        this.myRouter = myRouter;
        this.acativatedRouter = acativatedRouter;
        this.MatDialog = MatDialog;
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
        this.nameControl = new FormControl(null, [
            Validators.required, Validators.minLength(2), Validators.maxLength(20)
        ]);
        this.priceControl = new FormControl(null, [Validators.required, Validators.min(1)]);
        this.stockControl = new FormControl(null, [Validators.required, Validators.min(1)]);
        this.imageControl = new FormControl(null, Validators.required);
        this.categoryControl = new FormControl(null, Validators.required);
        this.productForm = new FormGroup({
            nameControl: this.nameControl,
            priceControl: this.priceControl,
            stockControl: this.stockControl,
            imageControl: this.imageControl,
            categoryControl: this.categoryControl
        });
    }
    async ngOnInit() {
        this.categories = await this.productService.getAllCategories();
    }
    async addProduct() {
        try {
            this.product.name = this.nameControl.value;
            this.product.price = this.priceControl.value;
            this.product.stock = this.stockControl.value;
            this.product.categoryId = this.categoryControl.value;
            await this.productService.addNewProduct(this.product);
            alert('Your new product has been added');
            console.log(this.product);
        }
        catch (err) {
            console.log(err);
        }
    }
    saveImage(event) {
        event.preventDefault();
        this.product.image = event.target.files;
    }
    close() {
        this.MatDialog.closeAll();
    }
};
AddNewProductComponent = __decorate([
    Component({
        selector: 'app-add-new-product',
        templateUrl: './add-new-product.component.html',
        styleUrls: ['./add-new-product.component.css']
    })
], AddNewProductComponent);
export { AddNewProductComponent };
//# sourceMappingURL=add-new-product.component.js.map