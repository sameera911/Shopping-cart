import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CrudProductsComponent } from './crud-products/crud-products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    CrudProductsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    CrudProductsComponent
  ],
  exports: [
    CrudProductsComponent
  ]
})
export class AdminModule { }
