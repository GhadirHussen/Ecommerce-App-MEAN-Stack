import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import AddressModel from 'src/app/models/address.Model';
import UserModel from 'src/app/models/user.Model';
'./cities.json';
let RegisterComponent = class RegisterComponent {
    constructor(http, authService, router) {
        this.http = http;
        this.authService = authService;
        this.router = router;
        this.user = new UserModel();
        this.address = new AddressModel();
        this.cities = [
            "New York", "New Jersey", "California", "Michigan", "Washington",
            "Texas", "Florida", "Arizona", "Ohio", "Mississippi"
        ];
        this.firstNameControl = new FormControl(null, [
            Validators.required, Validators.minLength(4), Validators.maxLength(10)
        ]);
        this.lastNameControl = new FormControl(null, [
            Validators.required, Validators.minLength(4), Validators.maxLength(10)
        ]);
        this.userNameControl = new FormControl(null, [
            Validators.required, Validators.minLength(3), Validators.maxLength(15)
        ]);
        this.passwordControl = new FormControl(null, [
            Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.min(1)
        ]);
        this.emailControl = new FormControl(null, [Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
        this.cityControl = new FormControl(null, Validators.required);
        this.streetControl = new FormControl(null, [
            Validators.required, Validators.minLength(3), Validators.maxLength(20)
        ]);
        this.userFormGroup = new FormGroup({
            firstNameControl: this.firstNameControl,
            lastNameControl: this.firstNameControl,
            userNameControl: this.userNameControl,
            passwordControl: this.passwordControl,
            emailControl: this.emailControl
        });
        this.addressFormGroup = new FormGroup({
            cityControl: this.cityControl,
            streetControl: this.streetControl
        });
    }
    ngOnInit() {
        if (this.authService.loggedIn()) {
            this.router.navigateByUrl('/');
        }
    }
    async register() {
        try {
            this.user.firstName = this.firstNameControl.value;
            this.user.lastName = this.firstNameControl.value;
            this.user.userName = this.userNameControl.value;
            this.user.password = this.passwordControl.value;
            this.user.email = this.emailControl.value;
            this.user.city = this.cityControl.value;
            this.user.street = this.streetControl.value;
            this.authService.register(this.user);
        }
        catch (err) {
            console.log(err);
        }
    }
};
RegisterComponent = __decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map