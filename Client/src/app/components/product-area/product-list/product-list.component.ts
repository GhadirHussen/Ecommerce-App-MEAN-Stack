import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import ProductModel from 'src/app/models/product.Model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  public products: ProductModel[];
  public user: string;
  public catId: string;
  public totalProducts:number;
  public totalOrders: number;
  public cart: any;

  constructor(private ProductsService: ProductService, private CartService: CartService,
    private route: ActivatedRoute, public AuthService:AuthService, private OrderService: OrderService
  ) { }



  async ngOnInit() {


    try{   
      this.products = await this.ProductsService.getAllProducts();
      this.ProductsService.allProducts.next(this.products);
      
      this.ProductsService.searchp.subscribe(async (keyWord) => {
        
        (await this.ProductsService.searchProduct(keyWord)).subscribe( res => {
          this.products = res;
        }, err => err);
      })
      
      this.route.params.subscribe(() => {
        this.catId = this.route.snapshot.paramMap.get('id');
          if(this.catId === null) {
            this.products;
            return;
          }
        this.ProductsService.getProductByCategoryId(this.catId).subscribe((data: any )=> {
          this.products = data
        });
      })
    }catch(err){
      console.log(err)
    } 

    
    this.totalProducts = (await this.ProductsService.getAllProducts()).length;
    this.totalOrders = (await this.OrderService.getAllOrders()).length;

    this.cart = await this.CartService.getCart();
    if(this.cart) {
      this.CartService.newCountItems.next(this.cart.cartItems.length);
    }
  }

}







