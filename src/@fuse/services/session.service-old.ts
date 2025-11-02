import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  
  LOGIN_URL, 
} from '../models/url';
import { HttpService } from '../../app/services/http.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(private httpService: HttpService) { }

  isLoggedIn = false;



  Login(loginId: string): Observable<any> {
    return this.httpService.postWithoutAuth(LOGIN_URL, {
      loginId
    });
  }

}
