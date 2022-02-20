import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import OrderModel from '../models/order.Model';
import store from '../redux/store';
import { CreateNewOrder, GetAllOrders, GetOrderByUser } from '../redux/Order';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private Router: Router, private authService: AuthService) { }

    
  async createOrder(order: OrderModel) {

    const newOrder = await this.http.post<OrderModel>('http://localhost:3030/api/order/', order).toPromise();
    store.dispatch(CreateNewOrder(newOrder))
    return newOrder;
  }

  async getOrderByUser() {
    
  const userId = (await this.authService.getLoginUser()).user._id;
  // const userId = JSON.parse(localStorage.getItem('user')).id;

  const order  =  await this.http.get<OrderModel[]>(`http://localhost:3030/api/order/${userId}`).toPromise();
    if(!order.length) {
      this.Router.navigate(['/store']);
    }
    store.dispatch(GetOrderByUser(order))
    return order;
  }
  
  async getAllOrders() {

    const orders =  await this.http.get<OrderModel[]>(`http://localhost:3030/api/order`).toPromise();
    return orders;
  }

}
