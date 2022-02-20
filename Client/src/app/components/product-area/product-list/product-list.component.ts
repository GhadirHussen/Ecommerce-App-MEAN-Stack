import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import ProductModel from 'src/app/models/product.Model';
import { HttpClient ,HttpErrorResponse,HttpHandler } from '@angular/common/http';
import { style } from '@angular/animations';
import { NgStyle } from '@angular/common';
import UserModel from 'src/app/models/user.Model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  public products: ProductModel[];
  public user: string;
  public catId: string;

  constructor(private Headers: HttpHandler,private ProductsService: ProductService, private http: HttpClient,
    private route: ActivatedRoute, public AuthService:AuthService
  ) { }



  async ngOnInit() {


    try{   
      this.products = await this.ProductsService.getAllProducts();
      
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

  }

  
  public async searchProduct(event: Event) {
    try{
      const keyWord = (event.target as HTMLInputElement).value;
 
      if(!keyWord)
      this.ngOnInit()
      this.products  = await this.ProductsService.searchProduct(keyWord);
    }
    catch(err) {
      console.log(err)
    }
    
  }
}








