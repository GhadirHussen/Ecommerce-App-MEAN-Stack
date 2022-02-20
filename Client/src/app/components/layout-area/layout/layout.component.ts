import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import CartModel from 'src/app/models/cart.Model';
import UserModel from 'src/app/models/user.Model';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { userLogOut } from 'src/app/redux/Auth';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import OrderModel from 'src/app/models/order.Model';
import { AlertService } from 'src/app/services/alert.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public Time: any;
  public cart: CartModel[];
  public order: OrderModel[]

  public Name: string;
  public myInterval: any;



  constructor(public auth: AuthService, private http: HttpClient, private router: Router, private orderService: OrderService,
    private route: ActivatedRoute, private alertService: AlertService
  ) { }

  ngOnInit() {  

  }


  
}
 