import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import AddressModel from 'src/app/models/address.Model';
import UserModel from 'src/app/models/user.Model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CitiesService } from 'src/app/services/cities.service';
import { ErrorsService } from 'src/app/services/errors.service';
 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: UserModel = new UserModel();
  public address : AddressModel = new AddressModel(); 

  public userFormGroup: FormGroup;
  public addressFormGroup: FormGroup;
  public formControl: FormGroup;
  public firstNameControl: FormControl;
  public lastNameControl: FormControl;
  public userNameControl: FormControl; 
  public passwordControl: FormControl;
  public emailControl: FormControl;
  public cityControl: FormControl;
  public streetControl: FormControl;


  constructor(private http: HttpClient, private authService: AuthService, private router: Router, public cities: CitiesService, private ErrorService: ErrorsService , private alertService: AlertService)
  { 
    this.firstNameControl = new FormControl(null,[
      Validators.required, Validators.minLength(4), Validators.maxLength(10)
    ]);
    this.lastNameControl = new FormControl(null,[
      Validators.required, Validators.minLength(4), Validators.maxLength(10)
    ]);
    this.userNameControl = new FormControl(null,[
      Validators.required, Validators.minLength(3), Validators.maxLength(15)
    ]);
    this.passwordControl = new FormControl(null,[
      Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.min(1)
    ]);
    this.emailControl = new FormControl(null, [Validators.required ,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
    this.cityControl = new FormControl(null, Validators.required);
    this.streetControl = new FormControl(null,[
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

  ngOnInit(): void {
    
    if(this.authService.loggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  
  public async register() {
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
    catch(err) {
      this.ErrorService.handelErrors = err;
      console.log(this.ErrorService.handelErrors.status)
        this.alertService.NotyfCenter.error(this.ErrorService.handelErrors.error);
    }
  } 
}


