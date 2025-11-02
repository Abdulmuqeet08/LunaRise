import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {
  SEND_NOTIFICATION_URL
} from '@fuse/models/url'

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(  private _httpClient: HttpClient,) { }

  sendNotification(messageDetails): Observable<any> {   
    return this._httpClient.post(SEND_NOTIFICATION_URL, messageDetails);
  }


}
