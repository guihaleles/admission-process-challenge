import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

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

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user: User){
    if (user.login === 'concert' && user.password === 'prova' ) { 
      this.loggedIn.next(true);
      this.router.navigate(['/client']);
    }
  }


}