import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';
import { ProductListComponent } from './components/product-area/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-area/product-details/product-details.component';
import { ProductCardComponent } from './components/product-area/product-card/product-card.component';
import { UpdateProductComponent } from './components/product-area/update-product/update-product.component';
import { AddNewProductComponent } from './components/product-area/add-new-product/add-new-product.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { GetCartComponent } from './components/cart-area/get-cart/get-cart.component';
import { OrderComponent } from './components/order-area/order/order.component';
import { OrderDetailComponent } from './components/order-area/order-detail/order-detail.component';



const routes: Routes = [
    {path: "", redirectTo: '/store', pathMatch: 'full' },
    {path:"store" , component :ProductListComponent, canActivate: [AuthGuard]},
    {path:"store/products/category/:id" , component :ProductListComponent,canActivate: [AuthGuard]},
    {path:"register" , component :RegisterComponent},
    {path:"login" , component :LoginComponent},
    {path:"store/order" , component :OrderComponent, canActivate: [AuthGuard]},
    {path:"store/order/orderDetails" , component :OrderDetailComponent, canActivate: [AuthGuard]},
    {path: "**", redirectTo: '/store'}
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
