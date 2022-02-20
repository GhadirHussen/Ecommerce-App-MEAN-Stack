import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LayoutComponent = class LayoutComponent {
    constructor(auth, http, router, route) {
        this.auth = auth;
        this.http = http;
        this.router = router;
        this.route = route;
    }
    ngOnInit() {
        this.date();
        // this.myInterval = setInterval(() => {
        //   this.Name  = `Wellcom ${JSON.parse(localStorage.getItem("user")).userName}`;
        // }, 1);
    }
    date() {
        const date = new Date();
        const yare = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDay();
        this.Time = `${day}/${month}/${yare}`;
    }
};
LayoutComponent = __decorate([
    Component({
        selector: 'app-layout',
        templateUrl: './layout.component.html',
        styleUrls: ['./layout.component.css']
    })
], LayoutComponent);
export { LayoutComponent };
//# sourceMappingURL=layout.component.js.map