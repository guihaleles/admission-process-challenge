import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';
import { GlobalService } from '../services/global.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private snackbar :SnackbarComponent, private global: GlobalService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.global.setIsLoading(true);
    console.log(true);

    return next.handle(request).pipe(
      delay(1000),
      tap(evt => {     
        console.log(evt); 
        if (evt instanceof HttpResponse) {
            if(evt.body){        
              this.global.setIsLoading(false);
            }
          }}
      ),

      catchError((error: HttpErrorResponse) => {
        this.global.setIsLoading(false);
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('this is client side error');
          errorMsg = `Erro: ${error.error.message}`;
        }
        else if(error.status === 0 && error.error instanceof ProgressEvent){
          console.log('this is a client side error, probably connection')
          errorMsg = 'Erro: Erro na conexão com o servidor'
        }
        else {
          console.log('this is server side error');
          console.log(error);
          errorMsg = `Erro: ${error.error}`;
        }
        // this.snackbar.openErrorSnackBar(errorMsg);
        return throwError(new Error(errorMsg));
      })
    );
  }

}
