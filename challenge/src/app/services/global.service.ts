import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, observable, Subject } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private isLoading: boolean = false;
  public sharedIsloading = new EventEmitter<boolean>();
  public loadigSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  getIsLoading(){
    return this.isLoading;
  }

  setIsLoading(isLoading:boolean){
    console.log("setIsloading");
    this.loadigSubject.next(isLoading);
    console.log(isLoading)
  }

}
