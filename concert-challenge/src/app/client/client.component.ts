import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  clients: Array<client> = [];
  dataSource: Array<client>;
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

  constructor(private http: HttpClient) {
    this.crud = new CrudService(http,'client')
  }

  ngOnInit(): void {
    this.dataSource = this.clients;
  }

  addItem(){
    this.action = 2;
    console.log("adding");
  }

  edit(value:client){
    this.action = 3;
    this.formGroup.patchValue(value);
    console.log("edit");
  }

  list(value:string){
    this.action = 1;
    console.log('list');
    this.crud.list().subscribe(
      (response) => {
        this.dataSource = response;
        console.log(this.dataSource);
      }    
    );

  }

  submit(){
    let client:client;
    client = this.formGroup.value;

    console.log(this.action);
    switch(this.action) {
      case 2: this.register(client);
      case 3: this.update(client);
      default: return;
     }
  }

  register(value:client){
    console.log(value)
    this.crud.register(value).subscribe(
      () => {
        console.log('sucesso');
        this.list('');
      }
    );
  }


  update(value:client){
    console.log(value)
    console.log('update')
    this.crud.update(value, value.id).subscribe(
      () => {
        console.log('sucesso');
        this.list('');
      }
    );
  }

  delete(value:client){
    this.crud.delete(value.id).subscribe(
      () => {
        console.log('sucesso');
        this.list('');
      }
    );
  }

}
