import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { GlobalService } from './services/global.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'con-challenge';
  isLoggedIn$: Observable<boolean>;
  isloading: boolean = false;
  isOpen = true;
  constructor(
    private authService: AuthService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.subscribe();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  subscribe() {
    this.globalService.loadigSubject
      .pipe(
        // To avoid an error
        delay(0)
      )
      .subscribe((data: boolean) => {
        this.isloading = data;
        console.log('app componente change');
        console.log(data);
      });
  }
}
