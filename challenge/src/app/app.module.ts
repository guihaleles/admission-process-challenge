import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { GlobalErrorHandler } from './services/global-error-handler.service';
import { RequestInterceptor } from './interceptor/request-interceptor.interceptor';
import { ProductModule } from './product/product.module';
import { SharedModule } from './shared/material/shared.module';
import { ClientModule } from './client/client.module';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    ProductModule,
    SharedModule,
    ClientModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      // processes all errors
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
      // multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
