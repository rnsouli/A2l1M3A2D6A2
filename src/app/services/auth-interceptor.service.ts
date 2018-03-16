import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  HttpRequest,  HttpHandler,  HttpEvent,  HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router:Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    
    if(true){
      request = request.clone({
        setHeaders:{
          AccessWebsite: 'true',
        },
        
      });
    }
    return next.handle(request).do((event:HttpEvent<any>) => {

    }, (err: any) => {
      if(err.status === 401){
      }
    });
  }
}