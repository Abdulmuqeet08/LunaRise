import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-success-modal',
    templateUrl: './profile-success-modal.component.html',
    styleUrls: []
})
export class ProfileSuccessModalComponent {
    constructor(private router: Router, private dialogRef: MatDialogRef<ProfileSuccessModalComponent>) {}

    // ✅ Close modal when "Got It!" is clicked
    closeModal() {
        this.dialogRef.close();
    }

    // ✅ Navigate and close modal
    navigateToCommunity() {
        this.router.navigate(['/community']);
        this.closeModal();
    }

    navigateToJobs() {
        this.router.navigate(['/jobs']);
        this.closeModal();
    }
}
