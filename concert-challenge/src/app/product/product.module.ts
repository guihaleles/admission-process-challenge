import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component'
import { SharedModule } from '../shared/material/shared.module';


const routes: Routes = [
  {path: '', component: ProductComponent}
];

@NgModule({
  declarations: [ProductComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports:[RouterModule]
})
export class ProductModule { }
