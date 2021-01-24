import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from '../app/login/login.component';
import { ClientComponent } from './client/client.component';
import { ProductComponent } from './product/product.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: 'client', component:ClientComponent, canActivate: [AuthGuard]},
  {path: 'product', component:ProductComponent, canActivate: [AuthGuard]},
  {path:'',redirectTo:'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
