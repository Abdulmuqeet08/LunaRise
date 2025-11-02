import { Component, OnInit } from '@angular/core';
import { WelcomeService } from './welcome.service';
import { Feature, Statistic } from './welcome.types';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { FormModalComponent } from './form-modal/form-modal.component';
import { VideoModalComponent } from './video-modal/video-modal.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: fuseAnimations
})
export class WelcomeComponent implements OnInit {
  features: Feature[] = [];
  statistics: Statistic[] = [];

  constructor(
    private welcomeService: WelcomeService, 
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.features = this.welcomeService.getFeatures();
    this.statistics = this.welcomeService.getStatistics();
  }

  openFormModal(): void {
    // Open the dialog with disableClose option
    const dialogRef = this._matDialog.open(FormModalComponent, {
      disableClose: true // Prevents closing when clicking outside
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        console.log('Compose dialog was closed!');
      });
  }

  // Method to open the video modal
  openVideoModal() {
    const dialogRef = this._matDialog.open(VideoModalComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the modal is closed
    });
  }
}