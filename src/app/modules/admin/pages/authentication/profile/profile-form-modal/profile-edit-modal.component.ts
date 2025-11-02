import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'app/core/auth/auth.service';
import { ProfileService } from '../profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileSuccessModalComponent } from '../success-modal/profile-success-modal.component';

@Component({
  selector: 'app-profile-edit-modal',
  templateUrl: './profile-edit-modal.component.html',
  styleUrls: []
})
export class ProfileEditModalComponent implements OnInit {
    @ViewChild('Profile') Profile: any;

    profileEditForm: FormGroup;
    userId: string;
    step: number = 1;
    totalSteps: number = 4;
    progress: number = 0;
    progressMessage: string = '';
    userProfile: any = null;

    constructor(
        private _authService: AuthService,
        private _profileService: ProfileService,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ProfileEditModalComponent>,
        private dialog: MatDialog,
        private cdr: ChangeDetectorRef
    ) {}

    async ngOnInit(){
        this.userId = this._authService.getAuth()?.UserID;

        this.profileEditForm = this._formBuilder.group({
            Headline: [''],
            Summary: [''],
            Skills: [''],
            Certifications: ['']
        });

        this._profileService.profileData$.subscribe((value) => {
            this.userProfile = value;
            alert(JSON.stringify(value))
            this.profileEditForm.patchValue(this.userProfile);
        });
        setTimeout((

           
        ) => 200);
        this.updateProgressMessage();
    }

    /**
     * Handle next step button click
     */
    nextStep(){
        if (!this.isStepValid()) {
            console.warn('⚠️ Please fill required fields before proceeding.');
            return;
        }

        if (this.step < this.totalSteps) {
            this.step++;
            this.updateProgress();
            this.updateProgressMessage();
            this.cdr.detectChanges();
        }
    }

    /**
     * Handle previous step button click
     */
    prevStep(){
        if (this.step > 1) {
            this.step--;
            this.updateProgress();
            this.updateProgressMessage();
            this.cdr.detectChanges();
        }
    }

    /**
     * Validate if the current step is filled
     */
    isStepValid(){
        const controlNames = ['Headline', 'Summary', 'Skills', 'Certifications'];
        return this.profileEditForm.controls[controlNames[this.step - 1]].valid;
    }

    /**
     * Update progress bar
     */
    updateProgress() {
        this.progress = (this.step / this.totalSteps) * 100;
        this.cdr.detectChanges();
    }

    /**
     * Update progress message
     */
    updateProgressMessage() {
        const messages = {
            1: '🩺 "Update your headline to reflect your role in healthcare!"',
            2: '📝 "Summarize your experience and contributions in healthcare."',
            3: '💡 "Highlight your key medical skills and specialties."',
            4: '📜 "Ensure your certifications and licenses are up to date!"'
        };
        this.progressMessage = messages[this.step] || '';
    }

    /**
     * Save profile data and close the modal
     */
       /**
     * Save profile data and close the modal
     */
       saveProfile(){
        if (this.profileEditForm.invalid) {
            console.warn('⚠️ Cannot submit: Form is incomplete!');
            return;
        }
    
        const profileData = { userId: this.userId, ...this.profileEditForm.value };
    
        // Call updateUserProfile without expecting an observable
        this._profileService.createnewprofile(profileData);
    
        // Subscribe to profileData$ to handle response
        this._profileService.profileData$.subscribe({
            next: (response) => {
                console.log('✅ Profile successfully updated!', response);
                
                // Detect changes to update UI without refreshing
                this.cdr.detectChanges();
    
                this.dialogRef.close();
            },
            error: (err) => {
                console.error('❌ Profile update failed:', err);
                
                // Ensure UI updates in case of error
                this.cdr.detectChanges();
            }
        });
    }
}