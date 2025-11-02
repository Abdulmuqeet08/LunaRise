import { 
    Component, 
    ViewChild, 
    ViewChildren, 
    QueryList, 
    ChangeDetectorRef, 
    ChangeDetectionStrategy, 
    OnInit 
} from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { ProfileService } from './profile.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditModalComponent } from './profile-form-modal/profile-edit-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileCompleteModalComponent } from './profile-complete-modal/profile-complete-modal.component';
import { ProfileVideoModalComponent } from './video-modal/video-modal.component';
import { LocationService } from '../../../../services/location.service';
import { Router } from '@angular/router';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form.component';
// import { ImageUploadComponent } from './profile_avatar/profile_avatar.component';


import { HotToastService } from '@ngneat/hot-toast';
import { UploadComponent} from '../../uploads/uploads.component'
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
    userProfile: any = null;
    profileForm: FormGroup;
    step = 1;  // Track the current onboarding step
    userId: any;
    lat: number | null = null;
    lng: number | null = null;
    imageUrl: any;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private _profileService: ProfileService,
        private cd: ChangeDetectorRef,
     
        private locationService: LocationService,
        private router: Router,
        private dialog: MatDialog,
        private toastService: HotToastService
    ) {
        

        
    }

    ngOnInit(): void {

        this.locationService.location$.subscribe(location => {
            if (location) {
                  // alert(JSON.stringify(location));
              this.lat = location.lat;
              this.lng = location.lng;
            }
          });

          this.profileForm = this.fb.group({
            Headline: ['', Validators.required],
            Summary: ['', Validators.required],
            Skills: [''],
            Certifications: [''],
            Experience: ['']
        });
        setTimeout(() => {
            this._profileService.profileData$.subscribe((value) => {
                this.userProfile = value;
            
                if (value?.ProfileImagePath) {  
                    const profileFullPath = value.ProfileImagePath;
                    const profileFileName = profileFullPath.substring(profileFullPath.lastIndexOf('/') + 1); // Extract filename
            
                    this.userProfile = {
                        ...value,
                        ProfileImagePath: `assets/profile/profile_avatar/${profileFileName}`
                    };
                } else {
                   
                    this.userProfile = {
                        ...value,
                        ProfileImagePath: 'assets/images/pages/profile/cover.jpg'
                    };
                }
            
                if (value?.ProfileBannerPath) {  
                    const bannerFullPath = value.ProfileBannerPath;
                    const bannerFileName = bannerFullPath.substring(bannerFullPath.lastIndexOf('/') + 1); // Extract filename
            
                    this.userProfile = {
                        ...this.userProfile,  // Preserve existing properties
                        ProfileBannerPath: `assets/profile/banner/${bannerFileName}`
                    };
                } else {
                    
                    this.userProfile = {
                        ...this.userProfile,
                        ProfileBannerPath: 'assets/images/pages/profile/cover.jpg'
                    };
                }
            
              
            
                this.cd.detectChanges();
            });
            
        }, 20);
    }
    

    loadProfileData(): void {
        const auth = this.authService.getAuth();
        const profileData = {
            entity: {
                userId: this.userProfile.userId,
                username: this.userProfile.username,
                profilepicture:this.userProfile.profilepicture,
                headline: this.userProfile.headline,
                summary: this.userProfile.summary,
                skills: this.userProfile.skills,
                certifications: this.userProfile.certifications,
                updatedat: this.userProfile.updatedat
            }
        };


        if (!auth?.UserID) {
            
            return;
        }

        const userId = Number(auth.UserID);

        if (isNaN(userId) || userId <= 0) {
           
            return;
        }

        
    }

    /** ✅ Edit User Profile */
    editUserProfile(){
        if (!this.userProfile) {
           
            return;
        }
    
       
    
        const profileData = {
            entity: {
                userId: this.userProfile.userId,
                username: this.userProfile.username,
                profilepicture: this.userProfile.profilepicture,
                headline: this.userProfile.headline,
                summary: this.userProfile.summary,
                skills: this.userProfile.skills,
                certifications: this.userProfile.certifications,
                updatedat: this.userProfile.updatedat
            }
        };
    
       
    
        // Call updateUserProfile without expecting an observable
        this._profileService.createnewprofile(profileData);
    
        // Subscribe to profileData$ to handle response
        this._profileService.profileData$.subscribe({
            next: (response) => {
                
            },
            error: (error) => {
                
            }
        });
    }
    

    /** ✅ Open Profile Form Modal */
    openProfileEditModal() {
        const dialogRef = this.dialog.open(ProfileEditModalComponent, {
            width: '1000px',
            disableClose: false,
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
           
        });
    }

    openDynamicFormModal(formId: number) {
        if (!formId) {
           
            return;
        }

       
        
        const dialogRef = this.dialog.open(DynamicFormComponent, {
            width: '800px',
            disableClose: true,
            data: { formId },
            
        });

        dialogRef.afterClosed().subscribe(result => {
            
            if (result) {
                // Handle form submission result if needed
                this.cd.detectChanges();
            }
        });
    }
    

    /** ✅ Open Final Profile Completion Modal */
    openProfileCompletionModal() {
        

        const dialogRef = this.dialog.open(ProfileCompleteModalComponent, {
            width: '500px',
            disableClose: true,
            data: { completion: 100 }
        });

        dialogRef.afterClosed().subscribe(() => {
            window.location.reload(); // Refresh profile page
        });
    }


    openProfileCompleteModal() {
       

        const dialogRef = this.dialog.open(ProfileCompleteModalComponent, {
            width: '400px',
            disableClose: true,
            data: { completion: 100 }
        });

        dialogRef.afterClosed().subscribe(() => {
            //window.location.reload(); // Refresh profile page
        });
    }

 // Method to open the video modal
 openProfileVideoModal() {
    const dialogRef = this.dialog.open(ProfileVideoModalComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the modal is closed
    });
  }

//   openProfile_avatarModal() {
   

    

//     const dialogRef = this.dialog.open(UploadComponent, {
//         width: '500px',
//         disableClose: true,
//         data: { type: "Profile",completion: 100 }
//     });

//     // ✅ Listen for modal close and update image dynamically
//     dialogRef.afterClosed().subscribe((result) => {
        
//         if (result ) {
//             this.toastService.success('✅ Image uploaded successfully!');
//             // this.cd.detectChanges(); // Force UI update
//         }
//     });
    
// }
openProfile_avatarModal() {
    const uploadInfoData = { type: "Profile", completion: 100 }; // ✅ Define uploadInfo
    console.log('Opening UploadComponent with:', uploadInfoData);

    const dialogRef = this.dialog.open(UploadComponent, {
        width: '500px',
        disableClose: true,
        data: { uploadInfo: uploadInfoData,isDialogMode: true }  // ✅ Pass uploadInfo inside data
    });
   
    dialogRef.afterClosed().subscribe((result) => {
        if (result) {
            this.toastService.success('✅ Image uploaded successfully!');
        }
    });
}
openProfile_bannerModal() {
    const uploadInfoData = { type: "Banner", completion: 100 }; // ✅ Wrap inside uploadInfo

    const dialogRef = this.dialog.open(UploadComponent, {
        width: '500px',
        disableClose: true,
        data: { uploadInfo: uploadInfoData,isDialogMode: true  }  // ✅ Corrected
    });
   

    dialogRef.afterClosed().subscribe((result) => {
        if (result) {
            this.toastService.success('✅ Image uploaded successfully!');
        }
    });

    console.log('Opening UploadComponent with:', { uploadInfo: uploadInfoData }); // ✅ Debugging
}




// openProfile_bannerModal() {
//    const dialogRef = this.dialog.open(UploadComponent, {
//         width: '500px',
//         disableClose: true,
//         data: { type: "Banner", completion: 100 } // Pass "Banner" type
//     });

//     // ✅ Listen for modal close and update image dynamically
//     dialogRef.afterClosed().subscribe((result) => {
        
//         if (result) {
//             this.toastService.success('✅ Banner uploaded successfully!');
//             // this.cd.detectChanges(); // Force UI update if necessary
//         }
//     });
// }



}
