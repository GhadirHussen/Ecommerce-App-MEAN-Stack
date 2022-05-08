import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { retry } from 'rxjs/operators';
import CartModel from 'src/app/models/cart.Model';
import CategoryModel from 'src/app/models/categoryModel';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { GetCartComponent } from '../../cart-area/get-cart/get-cart.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
}) 
export class HeaderComponent implements OnInit{

  public categories : CategoryModel[];
  public cart: CartModel;
  public totalItem : number = 0;
  public Name: string;
  public myInterval: any;
  public subscription: Subscription;

  public total: number;

  

  constructor(
    public AuthService: AuthService,
    private ProductsService:ProductService,
    private matDialog:MatDialog,
    private CartService: CartService,
    public Router: Router,
    private alertService: AlertService
  ) { }

   


  async ngOnInit() {
    try {

      this.categories = await this.ProductsService.getAllCategories();
      this.cart = await this.CartService.getCart();
      
      if(localStorage.getItem('MyCart') != null) {
        this.alertService.NotyfCenterOrder.success('Hi you have a safe shopping cart that you have not yet placed an order')
      }

      this.CartService.newCountItems.subscribe(i => {
        this.totalItem = i;
      });

      this.CartService.countItems.subscribe(i => {
        this.totalItem = i;
  
      });

    } catch(err) {
      console.log(err)
    }

  } 

  
  public async searchProduct(event: Event) {
    const keyWord = (event.target as HTMLInputElement).value;
    this.ProductsService.searchp.next(keyWord);
  }


  opentCart() {
    this.matDialog.open(GetCartComponent, {
      data: this.cart,
      width: "50%",
      height: "50%",
      panelClass: "cart"
     });

  }

  closeCart () {
    this.matDialog.closeAll();
  }
}

