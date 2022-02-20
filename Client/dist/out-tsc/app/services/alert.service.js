import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';
let AlertService = class AlertService {
    constructor() {
        this.Notyf = new Notyf({ duration: 2000, ripple: false, position: { x: "right", y: "top" } });
        this.NotyfCenter = new Notyf({ duration: 2000, ripple: false, position: { x: "center", y: "top" } });
        this.NotyfCenterOrder = new Notyf({ duration: 5000, ripple: false, position: { x: "center", y: "top" } });
    }
};
AlertService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AlertService);
export { AlertService };
//# sourceMappingURL=alert.service.js.map