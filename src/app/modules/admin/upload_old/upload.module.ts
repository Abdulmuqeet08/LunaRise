import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UploadComponent } from './upload.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FileSizePipe } from './file-size.pipe';
import { UploadRoutes } from './upload.routing';

@NgModule({
  declarations: [UploadComponent, FileSizePipe],
  imports: [
    RouterModule.forChild(UploadRoutes),
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  exports: [UploadComponent]
})
export class UploadModule { } 