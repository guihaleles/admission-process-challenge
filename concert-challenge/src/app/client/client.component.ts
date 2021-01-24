import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

export interface client{
  id: number
  name: string,
  date: Date,
  email: string,
  region: string, //select regiões do brasil
  gender: string, //radio
  information: boolean
}

export const REGIONS = ["Norte", "Nordeste", "Centroeste", "Suldeste", "Sul"];

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'region', 'gender', 'information', 'edit', 'delete'];
  dataSource: Array<client> = [];
  pageName = 'Clientes:';
  crud: CrudService<client>;
  action: number = 0;  //0:None  1:Search  2:Create  3:Edit 
  regions: string[] = REGIONS;

  formGroup = new FormGroup({
    id: new FormControl(),
    name : new FormControl('',Validators.required),
    date : new FormControl(null,Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    region: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required),
    information: new FormControl(false)
  })

  constructor(private http: HttpClient, private snackbar :SnackbarComponent) {
    this.crud = new CrudService(http,'client')
  }

  ngOnInit(): void { }

  addItem(){
    this.action = 2;
    this.formGroup.reset();
    console.log("adding");
  }

  edit(value:client){
    this.action = 3;
    this.formGroup.patchValue(value);
    console.log("edit");
  }

  list(value:string){
    this.action = 1;
    this.dataSource = [];
    console.log('list');
    this.crud.list().subscribe(
      (response) => {
        this.dataSource = response;
        console.log(this.dataSource);
        this.snackbar.openuSuccessSnackBar('Sucesso ao buscar os clientes!')      
      }    
    );

  }

  submit(){
    let client:client;

    if(this.formGroup.valid){
      client = this.formGroup.value;
      console.log(this.action);
      switch(this.action) {
        case 2: {this.register(client); return;}
        case 3: {this.update(client); return;}
        default: return;
       }
    }
  }

  register(value:client){
    console.log('post')
    console.log(value)
    this.crud.register(value).subscribe(
      () => {
        this.snackbar.openuSuccessSnackBar('Sucesso ao cadastrar o cliente!') 
        this.action = 0;
      }
    );
  }


  update(value:client){
    console.log(this.action);
    console.log('update');
    this.crud.update(value, value.id).subscribe(
      () => {
        this.snackbar.openuSuccessSnackBar('Sucesso ao atualizar o cliente!')
        this.action = 0;
      }
    );
  }

  delete(value:client){
    this.crud.delete(value.id).subscribe(
      () => {
        this.snackbar.openuSuccessSnackBar('Sucesso ao deletar o cliente!')
        this.action = 0;
      }
    );
  }

}
