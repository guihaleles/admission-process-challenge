import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component'
import { SharedModule } from '../shared/material/shared.module';


const routes: Routes = [
  {path: '', component: ClientComponent}
];

@NgModule({
  declarations: [ClientComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports:[RouterModule]
})
export class ClientModule { }
