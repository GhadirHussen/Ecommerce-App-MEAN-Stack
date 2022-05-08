import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ProductListComponent } from './components/product-area/product-list/product-list.component';
import { ProductCardComponent } from './components/product-area/product-card/product-card.component';
import { ProductDetailsComponent } from './components/product-area/product-details/product-details.component';
import { AddNewProductComponent } from './components/product-area/add-new-product/add-new-product.component';
import { UpdateProductComponent } from './components/product-area/update-product/update-product.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { GetCartComponent } from './components/cart-area/get-cart/get-cart.component';
import { OrderComponent } from './components/order-area/order/order.component';
import { OrderDetailComponent } from './components/order-area/order-detail/order-detail.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import { ImageHeaderComponent } from './components/layout-area/body/body.component';
import { ResetPasswordComponent } from './components/auth-area/email-reset-password/email-reset-password.component';
import { ResetpassComponent } from './components/auth-area/resetpass/resetpass.component';


@NgModule({
    declarations: [
        ProductListComponent,
        ProductCardComponent,
        ProductDetailsComponent,
        UpdateProductComponent,
        AddNewProductComponent,
        RegisterComponent,
        LoginComponent,
        LayoutComponent,
        HeaderComponent,
        GetCartComponent,
        OrderComponent,
        OrderDetailComponent,
        ImageHeaderComponent,
        ResetPasswordComponent,
        ResetpassComponent,
    ],
    
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        FormsModule,
        MatButtonToggleModule,
        MatStepperModule,
        MatSelectModule,
    ], 


    providers: [
        AuthService, AuthGuard,
        { 
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        }
    ],

    bootstrap: [LayoutComponent],
    entryComponents: [
        GetCartComponent
    ]
})
export class AppModule {}
  