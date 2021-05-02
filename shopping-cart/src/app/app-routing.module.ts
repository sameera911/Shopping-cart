import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { ProdFilterComponent } from './prod-filter/prod-filter.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  
  {path:'login', component:LoginComponent},
  {path:'list', component:ListProductsComponent},
  {path:'mycart', component:MyCartComponent},
  {path:'filter', component:ProdFilterComponent},
  {path:'register', component:RegisterComponent},
  {path:'', component:HomeComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
