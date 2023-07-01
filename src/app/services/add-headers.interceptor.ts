import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DirectoryService } from './directory.service';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class AddHeadersInterceptor implements HttpInterceptor {

  constructor(private _api:DirectoryService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._api.getToken();
    request = request.clone({
      headers: request.headers.set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')
    });

    if(token){
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + token
        }
      });
    }

    return next.handle(request).pipe(
      retry(1),
      catchError((error:HttpErrorResponse) => {
        
      })
    )
  }
}
