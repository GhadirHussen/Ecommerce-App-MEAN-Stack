import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import CartModel from 'src/app/models/cart.Model';
import OrderModel from 'src/app/models/order.Model';
import { AuthService } from 'src/app/services/auth.service';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import { Subscription } from 'rxjs';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/services/cart.service';
import { devOnlyGuardedExpression } from '@angular/compiler';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {



  public cart: CartModel;
  public orders: OrderModel[];
  public shippingDate: any = new Date().toLocaleString()
  public newOrder: OrderModel = new OrderModel();
  public orderFormGroup: FormGroup;
  public pymentGroup: FormGroup;
  public firstNameControl: FormControl;
  public lastNameControl: FormControl;
  public cardNumberControl: FormControl;
  public monthControl: FormControl; 
  public yearControl: FormControl;
  public cvvControl: FormControl;
  public shippingDateControl: FormControl;
  public isOptional: boolean = false;
  public year: number = new Date().getFullYear()



  constructor(private http: HttpClient, private authService: AuthService, private cartService: CartService,
    private Router: Router, private dialog: MatDialog, private orderService: OrderService, private alertService: AlertService

  ) { 

    this.firstNameControl = new FormControl(null,[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10)
    ]);
    
    this.lastNameControl = new FormControl(null,[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10)
    ]);


    this.cardNumberControl = new FormControl(null,[
      Validators.required,
      Validators.minLength(15),
      Validators.maxLength(16),
      Validators.min(1)
    ]);
    this.monthControl = new FormControl(null,[
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2),
      Validators.min(0)
    ]);
    this.yearControl = new FormControl(null,[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.min(this.year)
    ]);
    this.cvvControl = new FormControl(null,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
      Validators.min(0)
    ]);

    this.shippingDateControl = new FormControl(null,[
      Validators.required,
      Validators.min(this.shippingDate)
    ]);
    

    this.orderFormGroup = new FormGroup({
      firstNameControl: this.firstNameControl,
      lastNameControl: this.lastNameControl,
      shippingDateControl: this.shippingDateControl
    });

    this.pymentGroup = new FormGroup({
      cardNumberControl: this.cardNumberControl,
      monthControl: this.monthControl,
      yearControl: this.yearControl,
      cvvControl: this.cvvControl
    })
  }


  async ngOnInit() {

    this.cart = await this.cartService.getCart();
    this.orders = await this.orderService.getAllOrders();

    this.orderSecondTime();
  }



  async orderNow(userId: string, cartId: string) {

    this.newOrder.firstName = this.firstNameControl.value;
    this.newOrder.lastName = this.lastNameControl.value;
    this.newOrder.cardNumber = this.cardNumberControl.value;
    this.newOrder.month = this.monthControl.value;
    this.newOrder.year = this.yearControl.value;
    this.newOrder.cvv = this.cvvControl.value;
    this.newOrder.shippingDate = this.shippingDateControl.value;
    this.newOrder.userId = userId;
    this.newOrder.cartId = cartId;
    this.newOrder.totalPrice = this.cart.finalPrice;

    try {

      ////get the length of the same shipping date;
      const countOrdersWithSameDate = this.orders.filter
        ((obj) => obj.shippingDate === this.shippingDateControl.value).length;

      ///Check if there are more than 3 same delivery dates if true have to get another date
      if(countOrdersWithSameDate === 3) {
        this.alertService.NotyfCenterOrder.error(
        'Oop we have more than 3 orders in this day please choose another day');
        return
      }

      

      this.newOrder = await this.orderService.createOrder(this.newOrder);
      localStorage.removeItem('MyCart');

      Swal.fire({
        title: 'Your order has been successfully placed',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      this.Router.navigateByUrl('store/order/orderDetails');

    } catch(err) {
      console.log(err);
    }
  }


  ////Check if the cuurent user have order or not if yes ask him if he want to order again;
  async orderSecondTime() {
    const currentUser = (await this.authService.getLoginUser()).user._id;
    const check_orders_for_currentUser = this.orders.filter
    ((obj) => obj.userId === currentUser).length;

    if(check_orders_for_currentUser > 0) {
      Swal.fire({
        title: `You already have ${check_orders_for_currentUser} orders you want to order again ?`,
        showCancelButton: true,
        confirmButtonText: 'Yes', 
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
         return null;
        } else {
          this.Router.navigateByUrl('/store');
        }
      });
    }
  }



}
 