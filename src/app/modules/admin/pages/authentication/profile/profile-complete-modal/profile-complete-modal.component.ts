import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'app/core/auth/auth.service';
import { ProfileService } from '../profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileSuccessModalComponent } from '../success-modal/profile-success-modal.component';

@Component({
  selector: 'app-profile-complete-modal',
  templateUrl: './profile-complete-modal.html',
  styleUrls: []
})
export class ProfileCompleteModalComponent implements OnInit {
    @ViewChild('Profile') Profile: any;

    profileCompleteForm: FormGroup;
    userId: string;
    step: number = 1;
    totalSteps: number = 4;
    progress: number = 0;
    openSuccessModal: boolean = false;
    progressMessage: string = ''; // ✅ Added progress message variable

    constructor(
        private _authService: AuthService,
        private _profileService: ProfileService,
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ProfileCompleteModalComponent>,
        private dialog: MatDialog,
        private cdr: ChangeDetectorRef
    ) {}

    async ngOnInit(): Promise<void> {
        this.userId = this._authService.getAuth()?.UserID;

        this.profileCompleteForm = this._formBuilder.group({
            Headline: ['', Validators.required],
            Summary: ['', Validators.required],
            Skills: ['', Validators.required],
            Certifications: ['', Validators.required]
        });

        setTimeout(() => this.loadUserProfile(), 200);
        this.updateProgressMessage(); // ✅ Initialize first progress message
    }

    loadUserProfile(){
        // Call getUserProfile without expecting an observable
        this._profileService.getUserProfile(this.userId);
    
        // Subscribe to profileData$ to handle the response
        this._profileService.profileData$.subscribe({
            next: (data) => {
                if (data) {
                    this.profileCompleteForm.patchValue({
                        Headline: data.Headline || '',
                        Summary: data.Summary || '',
                        skills: data.skills || '',
                        Certifications: data.Certifications || ''
                    });
                    this.cdr.detectChanges();
                }
            },
            error: (err) => console.error('❌ Error loading profile:', err)
        });
    }
    
    nextStep(){
        if (!this.isStepValid()) {
            console.warn('⚠️ Please fill required fields before proceeding.');
            return;
        }

        if (this.step < this.totalSteps) {
            this.step++;
            this.updateProgress();
            this.updateProgressMessage(); // ✅ Update progress message
            this.cdr.detectChanges();
        }
    }

    prevStep(){
        if (this.step > 1) {
            this.step--;
            this.updateProgress();
            this.updateProgressMessage(); // ✅ Update progress message
            this.cdr.detectChanges();
        }
    }

    isStepValid(){
        const controlNames = ['Headline', 'Summary', 'Skills', 'Certifications'];
        return this.profileCompleteForm.controls[controlNames[this.step - 1]].valid;
    }

    updateProgress() {
        this.progress = (this.step / this.totalSteps) * 100;
        this.cdr.detectChanges();
    }

    updateProgressMessage() {
        const messages = {
            1: '🩺 "Every great healthcare professional has a mission. Define yours with a strong Headline!"',
            2: '📝 "Your journey in healthcare is inspiring! Summarize your experience and passion for saving lives."',
            3: '💡 "Your expertise makes a difference! Highlight your key medical skills and specialties."',
            4: '📜 "Your qualifications matter! Add your medical certifications and licenses to build trust and credibility."'
        };
        this.progressMessage = messages[this.step] || '';
    }

    finishProfile(){
        if (this.profileCompleteForm.invalid) {
            console.warn('⚠️ Cannot submit: Form is incomplete!');
            return;
        }
    
        const profileData = { userId: this.userId, ...this.profileCompleteForm.value };
    
        this._profileService.createnewprofile(profileData);
    
        this._profileService.profileData$.subscribe({
            next: (response) => {
                console.log('✅ Profile successfully updated!', response);
                this.dialogRef.close();
    
                const successDialogRef = this.dialog.open(ProfileSuccessModalComponent);
                successDialogRef.afterClosed().subscribe(() => {
                    console.log('🔄 Reloading profile data after success modal closed');
                });
    
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('❌ Profile update failed:', err);
                this.cdr.detectChanges();
            }
        });
    }
    

    closeModal(){
        console.log('❌ Closing profile modal without saving changes.');
        this.dialogRef.close();
    }
}
