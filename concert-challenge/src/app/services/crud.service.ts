import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { delay, tap, take } from 'rxjs/operators';

export class CrudService<T> {

  private readonly API = environment.API;
  // private readonly route = 'client';

  constructor(private http: HttpClient, private route: string) { }

  list() {
    console.log(`${this.API}${this.route}`);
    return this.http.get<T[]>(`${this.API}${this.route}`);
  }

  register(item:T){
    return this.http.post(`${this.API}${this.route}`, item)
    .pipe(
      take(1)
    );      
  }


  update(item:T, id: number){
    console.log(item);
    return this.http.put(`${this.API}${this.route}/${id}`, item)
    .pipe(
      take(1)
    );      
  }

  delete(id:number){
    return this.http.delete(`${this.API}${this.route}/${id}`)
    .pipe(
      take(1)
    );      
  }
}

