import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DynamicFormComponent } from '../../../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-video-modal',
  templateUrl: './forms.component.html',
  // styleUrls: ['./video-modal.component.scss']
})
export class FormComponent {
  modalOpen = false; // Track modal state

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    private dialog: MatDialog,
    private _router: Router
  ) {}

  /** ✅ Open the form modal */
  openForm(formId: string | number): void {
    if (this.modalOpen) {
      console.warn("🔹 Profile Form Modal is already open.");
      return;
    }

    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: '400px',
      disableClose: false,
      data: { formId }
    });

    this.modalOpen = true;

    dialogRef.afterClosed().subscribe(() => {
      this.modalOpen = false;

      // Only navigate if formId is valid
      if (formId) {
        this.navigateToForm(formId);
      } else {
        console.error("⚠️ Invalid formId provided:", formId);
      }
    });
  }

  /** ✅ Navigate to specific form */
  navigateToForm(formId: string | number): void {
    if (formId) {
      this._router.navigate([`/forms/${formId}`]);
    } else {
      console.error("⚠️ Cannot navigate: formId is missing or invalid.");
    }
  }

  /** ✅ Close the modal */
  onClose(): void {
    this.dialogRef.close();
  }
}
