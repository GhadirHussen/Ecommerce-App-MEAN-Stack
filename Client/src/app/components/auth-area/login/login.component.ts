import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import UserModel from 'src/app/models/user.Model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import store from '../../../redux/store';
import { userLogin } from '../../../redux/Auth';
import OrderModel from 'src/app/models/order.Model';
import { OrderService } from 'src/app/services/order.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: UserModel = new UserModel();
  public formControl: FormGroup;
  public userNameControl: FormControl;
  public passwordControl: FormControl;
  public order: OrderModel[];
  public servierError: string = '';

  constructor(private http: HttpClient, private router: Router, public authService: AuthService, private orderService: OrderService , private alertService: AlertService)
  { 

    this.userNameControl = new FormControl(null,[
      Validators.required, Validators.minLength(3), Validators.maxLength(15)
    ]);
    this.passwordControl = new FormControl(null,[
      Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.min(1)
    ]);


    this.formControl = new FormGroup({

      userNameControl: this.userNameControl,
      passwordNameControl: this.passwordControl,
    });
    
  }

  ngOnInit() {
  }

  
  public async login() {
    this.user.userName = this.userNameControl.value;
    this.user.password = this.passwordControl.value;
    (await this.authService.login(this.user)).subscribe(res => {
      localStorage.setItem("user", JSON.stringify(res));
      this.authService.getOrderLogin()
      this.router.navigate(['/store']);
      store.dispatch(userLogin(this.user));
    }, err => this.servierError = err.error.message);
  }

  
}
