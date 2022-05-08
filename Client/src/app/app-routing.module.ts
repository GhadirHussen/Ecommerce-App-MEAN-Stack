import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';
import { ProductListComponent } from './components/product-area/product-list/product-list.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { OrderComponent } from './components/order-area/order/order.component';
import { OrderDetailComponent } from './components/order-area/order-detail/order-detail.component';
import { ResetPasswordComponent } from './components/auth-area/email-reset-password/email-reset-password.component';
import { ResetpassComponent } from './components/auth-area/resetpass/resetpass.component';



const routes: Routes = [
    {path: "", redirectTo: '/store', pathMatch: 'full' },
    {path:"store" , component :ProductListComponent, canActivate: [AuthGuard]},
    {path:"store/products/category/:id" , component :ProductListComponent,canActivate: [AuthGuard]},
    {path:"register" , component :RegisterComponent},
    {path:"login" , component :LoginComponent},
    {path:"reset-component" , component :ResetPasswordComponent},
    {path:"passwordReset/:userId/:token" , component :ResetpassComponent},
    {path:"store/order" , component :OrderComponent, canActivate: [AuthGuard]},
    {path:"store/order/orderDetails" , component :OrderDetailComponent, canActivate: [AuthGuard]},
    {path: "**", redirectTo: '/store'}
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
