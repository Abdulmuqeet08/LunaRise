import { 
    Component, 
    ViewChild, 
    ChangeDetectorRef, 
    ChangeDetectionStrategy, 
    OnInit,
    TemplateRef 
} from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { ProfileService } from './profile.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadComponent } from '../../uploads/uploads.component';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
    @ViewChild(UploadComponent) uploadComponent!: UploadComponent;
    @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;

    userProfile: any = null;
    profileForm: FormGroup;
    cycleForm: FormGroup;
    step = 1;
    userId: any;
    alert: { type: string; message: string } | null = null;
    showAlert: boolean = false;
    isPostBoxOpen = false;
    latestPosts: any[] = [];
    isLoading = false;
    imageUrl: any;
    
    // Model URLs for the iframes
    modelUrl1: SafeUrl;
    modelUrl2: SafeUrl;

    // Flags to control iframe visibility
    showModel1: boolean = false;
    showModel2: boolean = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private _profileService: ProfileService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private dialog: MatDialog,
        private toastService: HotToastService,
        private http: HttpClient,
        private sanitizer: DomSanitizer  // Inject DomSanitizer
    ) {}

    ngOnInit() {
        this.userId = this.authService.getAuth()?.UserID;

        this.profileForm = this.fb.group({
            // Add profile-related controls here as needed
        });

        this.cycleForm = this.fb.group({
            StartDate: ['', Validators.required],
            EndDate: ['', Validators.required],
            CycleLength: [null, Validators.required],
            AveragePeriodLength: [null],
            Description: ['']
        });

        // Initialize model URLs and sanitize them
        this.modelUrl1 = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:8501 ');
        this.modelUrl2 = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:8502');

        setTimeout(() => {
            this._profileService.profileData$.subscribe((value) => {
                this.userProfile = value;

        

                this.userProfile = {
                    ...value,
                };

                this.cd.detectChanges();
            });
        }, 20);
    }



    submitCycleForm() {
        if (this.cycleForm.valid) {
            const cycleData = {
                ...this.cycleForm.value,
                UserID: this.userId
            };
    
            this._profileService.insertCycleData(cycleData); 
            this.toastService.success('Cycle data submitted successfully!');
            this.cycleForm.reset();
        } else {
            this.toastService.error('Please fill all required cycle fields.');
        }
    }
    
    predictCycleDate(cycleId: number) {
        this.isLoading = true;
    }

    // Method to toggle iframe visibility
    openModelFrame(model: string) {
        if (model === 'model1') {
            this.showModel1 = true;  // Show iframe for Model 1
            this.showModel2 = false; // Hide iframe for Model 2
        } else if (model === 'model2') {
            this.showModel2 = true;  // Show iframe for Model 2
            this.showModel1 = false; // Hide iframe for Model 1
        }
    }

    // Optional: Reset or close the iframe
    closeModelFrame(model: string) {
        if (model === 'model1') {
            this.showModel1 = false; // Hide iframe for Model 1
        } else if (model === 'model2') {
            this.showModel2 = false; // Hide iframe for Model 2
        }
    }
}
