import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './shared/components/home/home.component';
import { UsersComponent } from './shared/components/users/users.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { FairsComponent } from './shared/components/fairs/fairs.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { ProductDashboardComponent } from './shared/components/product-dashboard/product-dashboard.component';
import { ProductFormComponent } from './shared/components/product-form/product-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { GetConfirmationComponent } from './shared/components/get-confirmation/get-confirmation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashBoardComponent } from './shared/components/user-dash-board/user-dash-board.component';
import { UserFormComponent } from './shared/components/user-form/user-form.component';
import { FairsCardComponent } from './shared/components/fairs-card/fairs-card.component';
import { FairsDetailsComponent } from './shared/components/fairs-details/fairs-details.component';
import { FairsDashBoardComponent } from './shared/components/fairs-dash-board/fairs-dash-board.component';
import { HomepageComponent } from './shared/components/homepage/homepage.component';
import { AuthComponent } from './shared/components/auth/auth.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthInterceptor } from './shared/services/Auth-Interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    FairsComponent,
    NavBarComponent,
    ProductsComponent,
    ProductDashboardComponent,
    ProductFormComponent,
    GetConfirmationComponent,
    UserDashBoardComponent,
    UserFormComponent,
    FairsCardComponent,
    FairsDetailsComponent,
    FairsDashBoardComponent,
    HomepageComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
