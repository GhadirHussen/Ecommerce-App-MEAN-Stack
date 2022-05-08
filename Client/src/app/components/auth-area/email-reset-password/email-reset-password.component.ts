import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import AddressModel from 'src/app/models/address.Model';
import UserModel from 'src/app/models/user.Model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CitiesService } from 'src/app/services/cities.service';
import { ErrorsService } from 'src/app/services/errors.service';
import store from '../../../redux/store';
import { userRegister } from '../../../redux/Auth';
import Swal from 'sweetalert2';

 

@Component({
  selector: 'app-email-reset-password',
  templateUrl: './email-reset-password.component.html',
  styleUrls: ['./email-reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public form: FormGroup;
  public emailController: FormControl;
  public msg: string = '';

  constructor(
    private http: HttpClient, public fb: FormBuilder, private ErrorsService: ErrorsService,
    private AuthService: AuthService
  )
  {
    this.emailController = new FormControl(null, 
      [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]);

      this.form = this.fb.group({
        email: this.emailController
      })

  }  

  ngOnInit(): void {
     
  }


  public async sendResetEmail() {
    const formData: any = new FormData();
    formData.append('email', this.form.get('email').value);
    (await this.AuthService.sendResetEmail(formData))
      .subscribe((res: any) => {
        this.msg = res.message
      }, err =>  this.msg = err.error.text)
      return 
  } 

}


