import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {

  public form: FormGroup;
  public passwordControl: FormControl;
  public confirmPasswordControl: FormControl;
  public msg: string = '';
  public Token: any;
  public emptyArray: boolean = true;

  constructor(private Router: Router,private http: HttpClient ,private fb: FormBuilder, private AuthService: AuthService, private Route: ActivatedRoute)
  {
 
    this.passwordControl = new FormControl(null, 
      [
        Validators.required, Validators.minLength(4), Validators.maxLength(20)
      ]);
      this.confirmPasswordControl = new FormControl(null, 
      [
        Validators.required, Validators.minLength(4), Validators.maxLength(20)
      ]);
      this.form = this.fb.group({
        password: this.passwordControl,
        confirmPassword: this.confirmPasswordControl
      })
  
  }

  async ngOnInit() {
    
    const url = `http://localhost:3030/api/user/verify-email-reset`;
    try {
      this.Token = await this.http.get(url).toPromise();
      if(this.Token.length > 0) {
        this.emptyArray = false;
      }
    } catch(err) {
      console.log(err)
    }
  }


  public async ResetPassword() {
    const userId = this.Route.snapshot.params.userId;
    const token = this.Route.snapshot.params.token;
    const confirmPassword = this.form.get('confirmPassword').value;
    const password = this.form.get('password').value;
    const formData: any = new FormData();
    formData.append('password', password);
    if(password !== confirmPassword) {
      this.msg = 'The password does not match';
      return;
    }
    
    (await this.AuthService.ResetPassword(userId, token, formData)).subscribe((res: any) => {
      this.msg = res.message
    }, err => this.msg = err.error)
    
  }


}
