import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

export interface product{
  id: number
  name: string,
  date: Date,
  description: string,
  type: string, //select regiões do brasil
}

export const TYPE = ["Tipo 1", "Tipo 2", "Tipo 3"];

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'description', 'type', 'edit', 'delete'];
  dataSource: Array<product> = [];
  pageName = 'Produtos:';
  crud: CrudService<product>;
  action: number = 0;  //0:None  1:Search  2:Create  3:Edit 
  types: string[] = TYPE;

  formGroup = new FormGroup({
    id: new FormControl(),
    name : new FormControl('',Validators.required),
    date : new FormControl(null,Validators.required),
    description: new FormControl('',Validators.required),
    type: new FormControl('',Validators.required),
  })

  constructor(private http: HttpClient, private snackbar :SnackbarComponent) {
    this.crud = new CrudService(http,'product')
  }

  ngOnInit(): void { }

  addItem(){
    this.action = 2;
    this.formGroup.reset();
    console.log("adding");
  }

  edit(value:product){
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
        this.snackbar.openuSuccessSnackBar('Sucesso ao buscar os produtos!')      
      }    
    );

  }

  submit(){
    let product:product;

    if(this.formGroup.valid){
      product = this.formGroup.value;
      console.log(this.action);
      switch(this.action) {
        case 2: {this.register(product); return;}
        case 3: {this.update(product); return;}
        default: return;
       }
    }
    else{
      this.snackbar.openErrorSnackBar('Campo inválido')
    }
  }

  register(value:product){
    console.log('post')
    console.log(value)
    this.crud.register(value).subscribe(
      () => {
        this.snackbar.openuSuccessSnackBar('Sucesso ao cadastrar o produto!') 
        this.action = 0;
      }
    );
  }


  update(value:product){
    console.log(this.action);
    console.log('update');
    this.crud.update(value, value.id).subscribe(
      () => {
        this.snackbar.openuSuccessSnackBar('Sucesso ao atualizar o produto!')
        this.action = 0;
      }
    );
  }

  delete(value:product){
    this.crud.delete(value.id).subscribe(
      () => {
        this.snackbar.openuSuccessSnackBar('Sucesso ao deletar o produto!')
        this.action = 0;
      }
    );
  }

}
