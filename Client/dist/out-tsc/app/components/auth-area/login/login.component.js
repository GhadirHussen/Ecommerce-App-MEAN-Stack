import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import UserModel from 'src/app/models/user.Model';
let LoginComponent = class LoginComponent {
    constructor(http, router, authService, dialog) {
        this.http = http;
        this.router = router;
        this.authService = authService;
        this.dialog = dialog;
        this.user = new UserModel();
        this.userNameControl = new FormControl(null, [
            Validators.required, Validators.minLength(3), Validators.maxLength(15)
        ]);
        this.passwordControl = new FormControl(null, [
            Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.min(1)
        ]);
        this.formControl = new FormGroup({
            userNameControl: this.userNameControl,
            passwordNameControl: this.passwordControl,
        });
    }
    ngOnInit() {
    }
    async login() {
        this.user.userName = this.userNameControl.value;
        this.user.password = this.passwordControl.value;
        this.authService.login(this.user);
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map