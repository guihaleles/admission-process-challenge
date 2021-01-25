import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from '../app/login/login.component';
import { ClientComponent } from './client/client.component';
import { ProductComponent } from './product/product.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {
    path: 'client', 
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule), 
    canActivate: [AuthGuard]
  },
  {
    path: 'product', 
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule), 
    canActivate: [AuthGuard]
  },
  {path:'',redirectTo:'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
