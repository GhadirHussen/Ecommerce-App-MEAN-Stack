import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import UserModel from '../models/user.Model';
import store from '../redux/store';
import { userRegister, userLogin, userLogOut, UserActionType, getUser } from '../redux/Auth';
import Swal from 'sweetalert2';
import OrderModel from '../models/order.Model';
import { AlertService } from './alert.service';
import { environment } from '../../environments/environment';
import { globals } from 'src/environments/globals';
import { ErrorsService } from './errors.service';
import { Observable } from 'rxjs';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/throw";


@Injectable({
    providedIn: 'root' 
})
export class AuthService {



    constructor(
        private http: HttpClient, private router: Router,
<<<<<<< HEAD
        private ErrorService: ErrorsService, private AlertService: AlertService,
        private Route: ActivatedRoute
=======
        private ErrorService: ErrorsService, private AlertService: AlertService
>>>>>>> 9621f5da2f6eeb86785c37dbb37098649bf79945
    ) { }


    public async register(user: UserModel) {
        const addedUser = await this.http.post<UserModel>(`${environment.hostUrl}/${globals.registerUrl}`, user)
        .catch((err: any) => {
            return Observable.throw(err)
<<<<<<< HEAD
        })
=======
        });
>>>>>>> 9621f5da2f6eeb86785c37dbb37098649bf79945
        return addedUser;
    }

    
    public async login(user: UserModel) {
      
        const loggedInUser = this.http.post<UserModel>(`${environment.hostUrl}/${globals.loginUrl}`, user)
        .catch((err: any) => {
            return Observable.throw(err)
          });
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
        const user = await this.http.get<any>(`${environment.hostUrl}/${globals.getCurrentUser}`).toPromise();
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
        const getUsers = await this.http.get<UserModel>(`${environment.hostUrl}/${globals.userUrl}`).toPromise();
        return getUsers;
    }   

    public async getUserName() {

        const user = await this.http.get<UserModel>(`${environment.hostUrl}/${globals.getCurrentUser}`).toPromise();
        return !!user.isAdmin
    }


    ////check if the current user have order or not
    public async getOrderLogin() {
        const user = (await this.getLoginUser());
        
        const admin = user.user.isAdmin === true;
        const order  = await this.http.get<OrderModel[]>(`${environment.hostUrl}/${globals.orderUrl}/${user.user.id}`).toPromise();

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


    public async sendResetEmail(email: string) {
        const response = this.http.post(`${environment.hostUrl}/${globals.resetMail}`, email)
        .catch((err: any) => {
            return Observable.throw(err)
        })
        return response;
    }


  
    public async ResetPassword(userId:string, token: string, password: any) {

        const response = this.http.post(`${environment.hostUrl}/${globals.resetPassword}/${userId}/${token}`, password)
        .catch((err: any) => {
            return Observable.throw(err)
        })
        return response;
    }
}


















