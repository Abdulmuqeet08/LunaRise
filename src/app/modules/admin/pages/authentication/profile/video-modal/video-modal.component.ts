import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
//   styleUrls: ['./video-modal.component.scss']
})
export class ProfileVideoModalComponent {
  constructor(public dialogRef: MatDialogRef<ProfileVideoModalComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
