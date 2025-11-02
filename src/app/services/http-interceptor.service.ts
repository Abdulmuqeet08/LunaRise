import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IdentityService } from './identity.service';
import { HelpersService } from './helpers.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private identityService: IdentityService,
    private helpersService: HelpersService
  ) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.identityService.getAuth();
    let request = httpRequest;
    if (auth) {
      request = httpRequest.clone({
        setHeaders: {
          'content-type': 'application/json',
          'x-auth-token': auth.token|| '',
        }
      });
    }
    // alert(JSON.stringify(request));
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // alert(JSON.stringify(error))
        return throwError(error);
      })
    );
  }
}
