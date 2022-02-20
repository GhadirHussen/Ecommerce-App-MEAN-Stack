import { __decorate } from "tslib";
import { Component } from '@angular/core';
import UserModel from 'src/app/models/user.Model';
let ImageHeaderComponent = class ImageHeaderComponent {
    constructor(authService, Router) {
        this.authService = authService;
        this.Router = Router;
        this.Name = '';
        this.user = new UserModel();
    }
    ngOnInit() {
    }
    ///function to hide this component win get this URL
    hasRoute() {
        return this.Router.url.includes('/store/producs/');
    }
};
ImageHeaderComponent = __decorate([
    Component({
        selector: 'app-image-header',
        templateUrl: './body.component.html',
        styleUrls: ['./body.component.css']
    })
], ImageHeaderComponent);
export { ImageHeaderComponent };
//# sourceMappingURL=body.component.js.map