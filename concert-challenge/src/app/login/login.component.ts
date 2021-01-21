import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    if (!this.loginFormGroup.valid) {
      return;
    }
    console.log(this.loginFormGroup.value);

    if(this.loginFormGroup.value.login === 'concert' && 
        this.loginFormGroup.value.password === 'prova'){
          console.log('logado com sucesso');
    }

  }

}
