import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import UserModel from 'src/app/models/user.Model';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../../auth-area/login/login.component';

@Component({
  selector: 'app-image-header',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})


export class ImageHeaderComponent implements OnInit {

  private sub: Subscription;
  public userName: any;
  constructor(public authService: AuthService, public Router: Router, private http: HttpClient) {

  }

  async ngOnInit(){

  }      


  


}
