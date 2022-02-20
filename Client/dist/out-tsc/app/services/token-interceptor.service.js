import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
let TokenInterceptorService = class TokenInterceptorService {
    constructor(injector) {
        this.injector = injector;
    }
    intercept(req, next) {
        const authService = this.injector.get(AuthService);
        const token = req.clone({
            setHeaders: {
                Authorization: `Bearer ${authService.getToken()}`
            }
        });
        return next.handle(token);
    }
};
TokenInterceptorService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TokenInterceptorService);
export { TokenInterceptorService };
//# sourceMappingURL=token-interceptor.service.js.map