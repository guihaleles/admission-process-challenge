import {  OnInit, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material/snack-bar';

@Injectable({
  providedIn : 'root'
})
export class SnackbarComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  public openErrorSnackBar(message:string, type: string = 'error') {
    const config = new MatSnackBarConfig();
    config.panelClass = [`${type}-snackbar`];
    config.duration = 5000;
    config.horizontalPosition = 'end';
    config.verticalPosition = 'top';
    console.log(config);
    this._snackBar.open(message, 'x', config);
  }

  public openuSuccessSnackBar(message:string, type: string = 'success') {
    const config = new MatSnackBarConfig();
    config.panelClass = [`${type}-snackbar`];
    config.duration = 2000;
    config.horizontalPosition = 'end';
    config.verticalPosition = 'top';
    this._snackBar.open(message, 'x', config);
  }

}
