import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserViewaccountComponent } from './user-viewaccount/user-viewaccount.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'userRegister',component:UserRegisterComponent},
  {path:'userHome/userUpdate',component:UserUpdateComponent},
  {path:'userHome/userView',component:UserViewaccountComponent},
  {path:'userHome',component:UserHomeComponent},
  {path:'userCart',component:UserCartComponent},
  {path:'bookDetails',component:BookDetailsComponent},
  {path:'',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
