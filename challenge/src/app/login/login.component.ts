import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginFormGroup = new FormGroup({
    login : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  })

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.loginFormGroup.value);
    if (!this.loginFormGroup.valid) {
      return;
    }
    else{
      this.authService.login(this.loginFormGroup.value);
    }  
  }

}


