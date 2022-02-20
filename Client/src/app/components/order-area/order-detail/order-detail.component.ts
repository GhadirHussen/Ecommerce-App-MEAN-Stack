import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import CartModel from 'src/app/models/cart.Model';
import OrderModel from 'src/app/models/order.Model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderComponent } from '../order/order.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import ProductModel from 'src/app/models/product.Model';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {



  public order: OrderModel[];
  public cart : CartModel;
  public notify: OrderComponent;
  public lastOrder: any


  constructor(private http: HttpClient, private orderService: OrderService, private authService: AuthService, private Router: Router, private productService: ProductService
  ) { }
 
 
  async ngOnInit() {

    this.order = await this.orderService.getOrderByUser();
    this.lastOrder =  this.order[this.order.length -1];
  }


  OrderDonwload(){
    let element = document.getElementById('pdf');
    html2canvas(element).then(canvas => {        
      let PDF = new jsPDF();
      const imgData = canvas.toDataURL('image/png')
      PDF.addImage(imgData, -50, 0, 320, 140)    
      PDF.save('order.pdf');
    });   
   }

}
  











