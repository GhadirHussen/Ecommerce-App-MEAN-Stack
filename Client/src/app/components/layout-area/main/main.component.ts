import { Component, Input, OnInit } from '@angular/core';
import OrderModel from 'src/app/models/order.Model';
import ProductModel from 'src/app/models/product.Model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';





@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})



export class MainComponent implements OnInit {

  public totalProducts:number;
  public totalOrders: number;

  constructor(public AuthService: AuthService, private ProductServce: ProductService, private OrderService: OrderService) { }

  async ngOnInit(){

    this.totalProducts = (await this.ProductServce.getAllProducts()).length;
    this.totalOrders = (await this.OrderService.getAllOrders()).length;
  } 

}
