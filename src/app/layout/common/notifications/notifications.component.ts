import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map, take } from 'rxjs/operators';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';
import { TRAConfirmationService } from '@fuse/services/confirmation';
import { Auth } from 'app/models/auth';
import { IdentityService } from 'app/services/identity.service';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';

@Component({
    selector: 'notifications',
    templateUrl: './notifications.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'notifications'
})
export class NotificationsComponent implements OnInit, OnDestroy {
    @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
    @ViewChild('notificationsPanel') private _notificationsPanel: TemplateRef<any>;

    notifications$: Observable<Notification[]>; // Using Observable instead of manual subscription
    unreadCount$: Observable<number>; // Count unread notifications dynamically
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    offset: number;
    auth: Auth;
    LoggedInUserRole: any;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _notificationsService: NotificationsService,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private _TRAConfirmationService: TRAConfirmationService,
        private _IdentityService: IdentityService,
        private _matDialog: MatDialog
    ) {
        this.auth = this._IdentityService.getAuth();
        this.LoggedInUserRole = this.auth.roles[0];
    }

    ngOnInit(): void {
        this.offset = new Date().getTimezoneOffset();

        // Fetch notifications as an Observable

        this._notificationsService.notifications$.subscribe(data => {
            // console.log('Notifications Data:', data);
        });

        // Compute unread count dynamically
        this.unreadCount$ = this.notifications$.pipe(
            map(notifications => notifications.filter(n => !n.read).length)
        );
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        // Dispose overlay if exists
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
    }

    openPanel(): void {
        if (!this._notificationsPanel || !this._notificationsOrigin) {
            return;
        }
        if (!this._overlayRef) {
            this._createOverlay();
        }
        this._overlayRef.attach(new TemplatePortal(this._notificationsPanel, this._viewContainerRef));
    }

    closePanel(): void {
        this._overlayRef.detach();
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    private _createOverlay(): void {
        this._overlayRef = this._overlay.create({
            hasBackdrop: true,
            backdropClass: 'fuse-backdrop-on-mobile',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._notificationsOrigin._elementRef.nativeElement)
                .withLockedPosition(true)
                .withPush(true)
                .withPositions([
                    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
                    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
                    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
                    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' }
                ])
        });

        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }

    openFormModal(eventid): void {
        // Get notifications and find the matching event
        this.notifications$.pipe(
            take(1)
        ).subscribe(notifications => {
            if (notifications && notifications.length > 0) {
                // Find the notification that matches the eventid
                const notification = notifications.find(n => n.EventId === eventid);
                
                if (notification) {
                    // Open dialog with the selected notification
                    const dialogRef = this._matDialog.open(NotificationModalComponent, {
                        disableClose: true,
                        data: notification
                    });

                    dialogRef.afterClosed().subscribe((result) => {
                        console.log('Compose dialog was closed!');
                    });
                }
            }
        });
    }
//     //  openNotification(notification: any): void {
//     // this._matDialog.open(NotificationModalComponent, {
//     //   width: '600px',
//     //   data: notification, // Pass the correct notification
//     // });
//   }
    
}