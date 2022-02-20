import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import store from '../redux/store';
import { userRegister, userLogin, userLogOut } from '../redux/Auth';
import Swal from 'sweetalert2';
let AuthService = class AuthService {
    constructor(http, router) {
        this.http = http;
        this.router = router;
    }
    async register(user) {
        const url = 'http://localhost:3030/api/user/register';
        const addedUser = await this.http.post(url, user).toPromise();
        store.dispatch(userRegister(addedUser));
        Swal.fire({
            title: `Your registration has been successfully completed`,
            text: 'YOU ARE WELLCOM',
            timer: 3000,
            icon: 'success',
            showConfirmButton: false
        });
        this.router.navigate(['/login']);
        return addedUser;
    }
    async login(user) {
        const url = 'http://localhost:3030/api/user/login';
        const loggedInUser = await this.http.post(url, user)
            .subscribe((res) => {
            localStorage.setItem("user", JSON.stringify(res));
            store.dispatch(userLogin(user));
            Swal.fire({
                title: `Hello ${user.userName.toUpperCase()}`,
                text: 'YOU ARE WELLCOM',
                timer: 3000,
                icon: 'success',
                showConfirmButton: false
            });
            this.router.navigate(['/store']);
            console.log(res);
        });
        return loggedInUser;
    }
    loggedIn() {
        return !!JSON.parse(localStorage.getItem("user"));
    }
    checkAdmin() {
        if (JSON.parse(localStorage.getItem("user")).userName === 'admin') {
            return true;
        }
        else {
            return false;
        }
    }
    async getLoginUser() {
        const url = 'http://localhost:3030/api/user/user';
        const user = await this.http.get(url).toPromise();
        // store.dispatch(getUser(user));
        return user;
    }
    getToken() {
        if (JSON.parse(localStorage.getItem("user"))) {
            return JSON.parse(localStorage.getItem("user")).token;
        }
        else {
            return JSON.parse(localStorage.getItem("user"));
        }
    }
    logout() {
        store.dispatch(userLogOut());
        this.router.navigate(['/login']);
        Swal.fire({
            title: `We hope to see you again soon`,
            timer: 3000,
            showConfirmButton: false
        });
    }
    async getUser() {
        const url = 'http://localhost:3030/api/user/';
        const getUsers = await this.http.get(url).toPromise();
        return getUsers;
    }
    async getUserName() {
        const url = 'http://localhost:3030/api/user/user';
        const user = await this.http.get(url).toPromise();
        return !!user.isAdmin;
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map