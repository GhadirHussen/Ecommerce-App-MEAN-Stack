import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productsDownloadedAction, productAddedAction ,productUpdatedAction} from '../redux/Products';
import { CategoriesDownloadedAction } from '../redux/Categories';
import CategoryModel from '../models/categoryModel';
import ProductModel from '../models/product.Model';
import store from '../redux/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { globals } from 'src/environments/globals';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/throw"


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private _refresh$ = new Subject<any>();
  public searchp = new BehaviorSubject<any>('')
  public allProducts = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }
  public async getAllProducts() {
    
    if(store.getState().products.products.length === 0){
      const products = await this.http.get<ProductModel[]>(`${environment.hostUrl}/${globals.productsUrl}`).toPromise();
      store.dispatch(productsDownloadedAction(products));
    }
    return store.getState().products.products;
  }

  public async getOneProduct(id: string) {
    if (store.getState().products.products.length === 0) {
        const products = await this.http.get<ProductModel[]>(`${environment.hostUrl}/${globals.productsUrl}`).toPromise();
        store.dispatch(productsDownloadedAction(products));
    }
    const product = store.getState().products.products.find(p => p.id === id);
    return product;
  }


  public async searchProduct(keyWord: string) {

    return this.http.get<ProductModel[]>
    (`${environment.hostUrl}/${globals.searchPorduct}/${keyWord}`)
    .catch((err: any) => {
      return Observable.throw(err)
    });
  }


  public async addNewProduct(product: ProductModel) {
    const myFormData = ProductModel.convertToFormData(product);
    const addProduct =  await this.http.post<ProductModel>(`${environment.hostUrl}/${globals.productsUrl}`, myFormData).toPromise();
    store.dispatch(productAddedAction(addProduct));
    return addProduct;
  }

  public async updateProduct(product: ProductModel) {
    const myFormData = ProductModel.convertToFormData(product);
    const updatedProduct =  await this.http.put<ProductModel>(`${environment.hostUrl}/${globals.productsUrl}/${product.id}`, myFormData).toPromise();
    store.dispatch(productUpdatedAction(updatedProduct));
    return updatedProduct;
  }


  public async getAllCategories() {
    if(store.getState().categories.categories.length === 0){
      const categories = await this.http.get<CategoryModel[]>(`${environment.hostUrl}/${globals.categoryUrl}`).toPromise();
      store.dispatch(CategoriesDownloadedAction(categories));
    }

    return store.getState().categories.categories;
  }

 
  getProductByCategoryId(id:any) {
    const product =  this.http.get(`${environment.hostUrl}/${globals.categoryUrl}/${id}`);
    return product
  }
 
}
 