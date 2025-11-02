import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { P4UAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations,
  styles: [`
    :host {
      display: block;
      padding: 1.5rem;
      background-color: rgba(0, 0, 0, 0.5);
    }
  `]
})
export class NotificationModalComponent implements OnInit {
    @ViewChild('NotificationForm') NotificationNgForm: NgForm;
    
    alert: { type: P4UAlertType; message: string } = {
        type   : 'success',
        message: ''
    };

    NotificationForm: FormGroup;
    showAlert: boolean = false;
    formValues: any = [];

    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private cd: ChangeDetectorRef,
        public matDialogRef: MatDialogRef<NotificationModalComponent>,
        private _notificationsService: NotificationsService,
        @Inject(MAT_DIALOG_DATA) public data: any  
    ) {}

    ngOnInit(): void {
        // Initialize the form
        this.NotificationForm = this._formBuilder.group({
            EventName: ['', [Validators.required]],
            Description: ['', [Validators.required]],
            StartDateTime: ['', [Validators.required]],
            EndDateTime: [''],
            EventStatus: [''],
            Address: [''],
            Room: [''],
            IsVirtual: [''],
            SpeakerName: [''],
            Bio: [''],
            ContactInfo: [''],
            RegistrationRequired: [true],  // Ensure this field exists
        });

        // Populate the form with data if available
        if (this.data) {
            this.NotificationForm.patchValue(this.data);
        }
    }

    saveAndClose(): void {
        this.matDialogRef.close();
    }

    registerForEvent(): void {
        this.showAlert = false;  

        // Validate the form
        if (this.NotificationForm.invalid) {
            this.alert = {
                type: 'error',
                message: 'Please fill in all required fields.',
            };
            this.showAlert = true;
            this.cd.detectChanges();
            return;
        }

        // Simulate registration process
        this.NotificationForm.disable();
        this.showAlert = false;
        this.formValues = this.NotificationForm.getRawValue();

        // Mock API call for registration (Replace with real API call)
        setTimeout(() => {
            this.NotificationForm.enable();
            this.NotificationNgForm.resetForm();

            this.alert = {
                type: 'success',
                message: 'You have successfully registered for the event!',
            };

            this.showAlert = true;

            // Close the dialog after 3 seconds
            setTimeout(() => {
                this.matDialogRef.close();
            }, 3000);
        }, 2000);
    }

    onClose(): void {
        this.matDialogRef.close();
    }
}
