import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { GlobalService } from './global.service';

export interface User{
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Trocar de true para false para ativar login
  private loggedIn = new BehaviorSubject<boolean>(true);
  private user:User; 

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private snackbar :SnackbarComponent,
    private globarService:GlobalService
  ) {}

  login(user: User){
    this.globarService.setIsLoading(true);
    this.user = user;
    window.setTimeout(()=>{
        this.globarService.setIsLoading(false);
        if (this.user.login === 'concert' && this.user.password === 'prova' ) { 
          this.loggedIn.next(true);
          this.snackbar.openuSuccessSnackBar('Login realizado com sucesso!')  
          this.router.navigate(['/client']);
        }
        else{
          throw new Error("Login e/ou senha inválidos")
        }    
    }
    ,1000);
  }

  function(){
    
  }
}