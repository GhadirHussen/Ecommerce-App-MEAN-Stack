import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productsDownloadedAction, productAddedAction, productDeletedAction ,productUpdatedAction, ProductState} from '../redux/Products';
import { CategoriesDownloadedAction, CategoryState } from '../redux/Categories';
// import store from '../redux/store';
import CategoryModel from '../models/categoryModel';
import ProductModel from '../models/product.Model';
import UserModel from '../models/user.Model';
import store from '../redux/store';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private _refresh$ = new Subject<any>();
  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }
  public async getAllProducts() {
    
    if(store.getState().products.products.length === 0){
      const products = await this.http.get<ProductModel[]>('http://localhost:3030/api/products').toPromise();
      store.dispatch(productsDownloadedAction(products));
    }
    return store.getState().products.products;
  }

  public async getOneProduct(id: string) {
    if (store.getState().products.products.length === 0) {
        const products = await this.http.get<ProductModel[]>('http://localhost:3030/api/products').toPromise();
        store.dispatch(productsDownloadedAction(products));
    }
    const product = store.getState().products.products.find(p => p.id === id);
    return product;
  }


  public async searchProduct(keyWord: string) {
    const product  = await this.http.get<ProductModel[]>
    (`http://localhost:3030/api/products/search/${keyWord}`).toPromise();

    return product;
  }

  public async addNewProduct(product: ProductModel) {
    const myFormData = ProductModel.convertToFormData(product);
    const addProduct =  await this.http.post<ProductModel>('http://localhost:3030/api/products', myFormData).toPromise();
    store.dispatch(productAddedAction(addProduct));
    return addProduct;
  }

  public async updateProduct(product: ProductModel) {
    const myFormData = ProductModel.convertToFormData(product);
    const updatedProduct =  await this.http.put<ProductModel>('http://localhost:3030/api/products/' + product.id, myFormData).toPromise();
    store.dispatch(productUpdatedAction(updatedProduct));
    return updatedProduct;
  }


  public async getAllCategories() {
    if(store.getState().categories.categories.length === 0){
      const categories = await this.http.get<CategoryModel[]>('http://localhost:3030/api/categories/').toPromise();
      store.dispatch(CategoriesDownloadedAction(categories));
    }

    return store.getState().categories.categories;
  }

 
  getProductByCategoryId(id:any) {
    const product =  this.http.get("http://localhost:3030/api/categories/" +id)
    return product
  }
 
  // getProductByCategoryId(id:any) :Observable<any> {
  //   const url = 'http://localhost:3030/api/categories/'
  //   return this.http.get<ProductModel[]>(url + id)
  //     .pipe(
  //       tap(() => {
  //         this._refresh$.next();
  //       })
  //     )

  // }
}
 