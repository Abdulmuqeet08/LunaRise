import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { P4UAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class FormModalComponent implements OnInit {
    @ViewChild('comingSoonNgForm') comingSoonNgForm: NgForm;

    alert: { type: P4UAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    comingSoonForm: FormGroup;
    showAlert: boolean = false;
    formValues: any = [];
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,

    private cd: ChangeDetectorRef,
    public matDialogRef: MatDialogRef<FormModalComponent>
) {}

ngOnInit(): void {
  // Create the form
  this.comingSoonForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      city: [''],
  });

}

saveAndClose(): void
{
    // Save the message as a draft

    // Close the dialog
    this.matDialogRef.close();
}

register(): void {
  this.showAlert = false;  
  // Return if the form is invalid
  if (this.comingSoonForm.invalid) {
      this.alert = {
          type: 'error',
          
          message: 'Please fill in all required fields',
      };
      this.showAlert = true;  
      this.cd.detectChanges();
      return;
  }
else{

this.comingSoonForm.disable();

// Hide the alert
this.showAlert = false;

this.formValues = this.comingSoonForm.getRawValue();


   // this.comingSoonForm.enable();

      // Reset the form
      this.comingSoonNgForm.resetForm();

      // Set the alert
      this.alert = {
          type: 'success',
          message: 'You have been registered to the list.',
      };
      this.showAlert = true;
 
  // Do your action here...
  // Emulate server delay
  setTimeout(() => {
      // Re-enable the form
   
      this.matDialogRef.close();
  }, 3000);
}
}
  onClose(): void {
    this.matDialogRef.close();
  }

  
}
