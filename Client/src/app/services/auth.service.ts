import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import UserModel from '../models/user.Model';
import store from '../redux/store';
import { userRegister, userLogin, userLogOut, UserActionType, getUser, AuthState } from '../redux/Auth';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import OrderModel from '../models/order.Model';
import { OrderService } from './order.service';
import { AlertService } from './alert.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
    providedIn: 'root' 
})
export class AuthService {



    constructor(private http: HttpClient, private router: Router , private alertService: AlertService) { }


    public async register(user: UserModel) {
        const url = 'http://localhost:3030/api/user/register';
        const addedUser = await this.http.post<UserModel>(url, user).toPromise();
        store.dispatch(userRegister(addedUser));
        Swal.fire({
            title: `Your registration has been successfully completed`,
            text: 'YOU ARE WELLCOM',
            timer: 3000,
            icon:'success',
            showConfirmButton: false
        }); 
        this.router.navigate(['/login']);
        return addedUser;
    }


    public async login(user: UserModel) {
        const url = 'http://localhost:3030/api/user/login';
      
        const loggedInUser = this.http.post<UserModel>(url, user)
        .subscribe(
            (res) => {

              localStorage.setItem("user", JSON.stringify(res));
              
              this.getOrderLogin()
              this.router.navigate(['/store']);
              store.dispatch(userLogin(user));
            }
        )
        return loggedInUser;
    }

    loggedIn() {
        return !!JSON.parse(localStorage.getItem("user"));
    }

    checkAdmin() {
        if(JSON.parse(localStorage.getItem("user")).userName === 'admin') {
            return true
        } else {
            return false
        }
    }
    
    //get the current user
    async getLoginUser() {
        const url = 'http://localhost:3030/api/user/user';
        const user = await this.http.get<any>(url).toPromise();
        store.dispatch(getUser(user));
        return user;
    }


    getToken () {
        if(JSON.parse(localStorage.getItem("user"))) {
            return JSON.parse(localStorage.getItem("user")).token;
        }else {
            return JSON.parse(localStorage.getItem("user"));
        }
    }

    public logout() {
        store.dispatch(userLogOut());
        store.dispatch({ type: UserActionType.userLogOut, payload: null});
        this.router.navigate(['/login']);
        Swal.fire({
            title: `Bye Bye Dear!`,
            text:'We hope to see you again soon',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
            },
            timer: 2000,
            showConfirmButton: false
        });
    }
    
    async getUsers() {
        const url = 'http://localhost:3030/api/user/';
        const getUsers = await this.http.get<UserModel>(url).toPromise();
        return getUsers;
    }   

    public async getUserName() {

        const url = 'http://localhost:3030/api/user/user';
        const user = await this.http.get<UserModel>(url).toPromise();
        return !!user.isAdmin
    }


    ////check if the current user have order or not
    public async getOrderLogin() {
        // const user = JSON.parse(localStorage.getItem('user'));
        const user = (await this.getLoginUser());
        
        const admin = user.user.isAdmin === true;
        const order  = await this.http.get<OrderModel[]>(`http://localhost:3030/api/order/${user.user.id}`).toPromise();

        if(!order.length) {
            if(admin) {

                Swal.fire({
                    title: `Hello ${user.user.userName}!`,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                    },
                    showConfirmButton: false
                });
            } else {
                Swal.fire({
                    title: `Hello ${user.user.userName} in your first order !`,
                    text:'We are very happy you chose us',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                    },
                    showConfirmButton: false
                });
            }

        } else {
          Swal.fire({
            title: `Hello ${user.user.userName.toUpperCase()}`,
            text: 'You Want To Get Your Last Order ?',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No"
          }).then((result) => {
            if(result.isConfirmed) {
              this.router.navigateByUrl('/store/order/orderDetails')
            }
          })
        }
    }
}


















