import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudProductsComponent } from './crud-products/crud-products.component';

const routes: Routes = [
  {path:'crudProducts', component:CrudProductsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
