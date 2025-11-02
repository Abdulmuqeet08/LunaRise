import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject,of, throwError } from 'rxjs';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import { map, switchMap, take, tap ,catchError} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Utf8 from 'crypto-js/enc-utf8';
import { cloneDeep } from 'lodash-es';
import { Subject } from 'rxjs';
import { Auth } from 'app/models/auth';
import { IdentityService } from 'app/services/identity.service';

import {  
    // GET_RESET_PASSWORD_REQUEST_URL,
    POST_REQUEST_APPROVAL_URL
  } from '../../../../@fuse/models/url';
import { SessionService } from 'app/services/session.service';
@Injectable({
    providedIn: 'root'
})
export class NotificationsService
{
    private _notificationscount: BehaviorSubject<any> = new BehaviorSubject<any>(1);
    private _notifications: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    

    /**
     * Constructor
     */
    auth:Auth;
    constructor(
        private _httpClient: HttpClient,
        public _sessionService:SessionService,
        private _IdentityService:IdentityService

        )
    {
        this.auth= this._IdentityService.getAuth();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for notifications
     */
    get notificationscount$(): Observable<Notification[]>
    {
        return this._notificationscount.asObservable();
    }
    get notifications$(): Observable<Notification[]>
    {
        return this._notifications.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    
    

   

    /**
     * Create a notification
     *
     * @param notification
     */
    // create(notification: Notification): Observable<Notification>
    // {
    //     return this.notifications$.pipe(
    //         take(1),
    //         switchMap(notifications => this._httpClient.post<Notification>('api/common/notifications', {notification}).pipe(
    //             map((newNotification) => {

    //                 // Update the notifications with the new notification
    //                 this._notifications.next([...notifications, newNotification]);

    //                 // Return the new notification from observable
    //                 return newNotification;
    //             })
    //         ))
    //     );
    // }

    /**
     * Update the notification
     *
     * @param id
     * @param notification
     */
    // update(id: string, notification: Notification): Observable<Notification>
    // {
    //     return this.notifications$.pipe(
    //         take(1),
    //         switchMap(notifications => this._httpClient.patch<Notification>('api/common/notifications', {
    //             id,
    //             notification
    //         }).pipe(
    //             map((updatedNotification: Notification) => {

    //                 // Find the index of the updated notification
    //                 const index = notifications.findIndex(item => item.id === id);

    //                 // Update the notification
    //                 notifications[index] = updatedNotification;

    //                 // Update the notifications
    //                 this._notifications.next(notifications);

    //                 // Return the updated notification
    //                 return updatedNotification;
    //             })
    //         ))
    //     );
    // }

    /**
     * Delete the notification
     *
     * @param id
     */
    // delete(id: string): Observable<boolean>
    // {
    //     return this.notifications$.pipe(
    //         take(1),
    //         switchMap(notifications => this._httpClient.delete<boolean>('api/common/notifications', {params: {id}}).pipe(
    //             map((isDeleted: boolean) => {

    //                 // Find the index of the deleted notification
    //                 const index = notifications.findIndex(item => item.id === id);

    //                 // Delete the notification
    //                 notifications.splice(index, 1);

    //                 // Update the notifications
    //                 this._notifications.next(notifications);

    //                 // Return the deleted status
    //                 return isDeleted;
    //             })
    //         ))
    //     );
    // }

    /**
     * Mark all notifications as read
     */
    // markAllAsRead(): Observable<boolean>
    // {
    //     return this.notifications$.pipe(
    //         take(1),
    //         switchMap(notifications => this._httpClient.get<boolean>('api/common/notifications/mark-all-as-read').pipe(
    //             map((isUpdated: boolean) => {

    //                 // Go through all notifications and set them as read
    //                 notifications.forEach((notification, index) => {
    //                     notifications[index].read = true;
    //                 });

    //                 // Update the notifications
    //                 this._notifications.next(notifications);

    //                 // Return the updated status
    //                 return isUpdated;
    //             })
    //         ))
    //     );
    // }
}