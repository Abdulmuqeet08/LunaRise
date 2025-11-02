import { Component, Inject, Input, Optional, ViewChild } from '@angular/core'; 
import { MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../../../src/environments/environment'; 
import { HotToastService } from '@ngneat/hot-toast';
import { IdentityService } from 'app/services/identity.service';
import { Auth } from 'app/models/auth';
import { UploadService } from '../uploads/uploads.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-upload',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadComponent {
  @Input() uploadInfo: any = {};
  @Input() isDialogMode: boolean = true;
  @ViewChild('fileInput') fileInput!: Element;
  isModalOpen: boolean = false;
  selectedFile: File | null = null;

  imagePreviews: string[] = []; // Ensure this is initialized as an empty array

//   imagePreview: string[] = []; // Change from string to string[]
  isUploading: boolean = false;
  uploadProgress: number = 0;
  Path: string = environment.path;
  auth: Auth;
  UserID: any;
  imageUrl: any;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private toastService: HotToastService,
    private _IdentityService: IdentityService,
    private _UploadService: UploadService,
    @Optional() public matDialogRef: MatDialogRef<UploadComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data?: any  
  ) {}

  ngOnInit() {
    this.auth = this._IdentityService.getAuth();
    this.UserID = this.auth?.UserID || null;

    if (!this.UserID) {
      this.toastService.error('User authentication failed. Please log in again.');
    }

    if (this.isDialogMode && this.data?.uploadInfo) {
      this.uploadInfo = this.data.uploadInfo;
    }

    if (this.isDialogMode) {
      this.openModal();
    }
  }

  cancelUpload() {
    this.selectedFile = null;
    this.imagePreviews = null;
    (document.querySelector('input[type="file"]') as HTMLInputElement).value = '';
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  selectedFiles: File[] = []; // Array to hold multiple files

  onFileSelected(event: Event): void {
      event.preventDefault(); // Prevent default form submission behavior
      const inputElement = event.target as HTMLInputElement;
  
      if (inputElement.files && inputElement.files.length > 0) {
          let modulename = this.data?.uploadInfo?.modulename || this.uploadInfo?.modulename;
          const selectedFileArray = Array.from(inputElement.files); // Convert FileList to an array
  
          // Define modules that allow only a single image
          const imageOnlyModules = ['Banner', 'Profile']; 
  
          if (imageOnlyModules.includes(modulename)) {
              // Ensure only one image is selected
              if (selectedFileArray.length > 1) {
                  this.toastService.error(`Only one image is allowed for ${modulename}.`);
                  inputElement.value = ''; // Reset file input
                  return;
              }
              if (!selectedFileArray[0].type.startsWith('image/')) {
                  this.toastService.error(`Only images are allowed for ${modulename}.`);
                  inputElement.value = ''; // Reset file input
                  return;
              }
          }
  
          // Update selected files only after passing validation
          this.selectedFiles = selectedFileArray;
          console.log("Selected files:", this.selectedFiles);
          this.validateFile();
      }
  }
  
  validateFile() {
    if (!this.selectedFiles.length) return;

    let modulename = this.data?.uploadInfo?.modulename || this.uploadInfo?.modulename;

    const imageOnlyModules = ['Banner', 'Profile']; 
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    const allowedFileTypes = [
        ...allowedImageTypes, 
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    this.imagePreviews = []; // Reset previews before adding new ones

    for (let file of this.selectedFiles) {
        if (imageOnlyModules.includes(modulename)) {
            if (!allowedImageTypes.includes(file.type)) {
                this.toastService.error(`Only images are allowed for ${modulename}.`);
                this.selectedFiles = [];
                return;
            }
        } else {
            if (!allowedFileTypes.includes(file.type)) {
                this.toastService.error(`Invalid file type for ${modulename}. Allowed types: Images, PDFs, and DOCX.`);
                this.selectedFiles = [];
                return;
            }
        }

        const maxSize = file.type.startsWith('image/') ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
        if (file.size > maxSize) {
            this.toastService.error(`File size should be less than ${maxSize / (1024 * 1024)}MB.`);
            this.selectedFiles = [];
            return;
        }

        // **Generate image previews**
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.imagePreviews.push(e.target.result); // Add preview
            };
            reader.readAsDataURL(file);
        }
    }

    console.log("✅ File validation passed for module:", modulename);
}

  



/** Prevent form submission from reloading the page */
// onFileSelected(event: Event): void {
//   event.preventDefault(); // Prevents any default form submission behavior
//   const inputElement = event.target as HTMLInputElement;
//   if (inputElement.files && inputElement.files.length > 0) {
//     this.selectedFile = inputElement.files[0];
//     this.validateFile();
//   }
// }


// selectedFiles: File[] = []; // Array to hold multiple files

// onFileSelected(event: Event): void {
//   event.preventDefault(); // Prevent default form submission behavior
//   const inputElement = event.target as HTMLInputElement;

//   if (inputElement.files && inputElement.files.length > 0) {
//     this.selectedFiles = Array.from(inputElement.files); // Convert FileList to an array
//     console.log("Selected files:", this.selectedFiles);
//     this.validateFile();
//   }
// }




  openModal() {
    if (this.isDialogMode) {
      this.isModalOpen = true;
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.cancelUpload();

    if (this.isDialogMode && this.matDialogRef) {
      this.matDialogRef.close();
    }
  }



  uploads(): void { 
    if (!this.selectedFiles || this.selectedFiles.length === 0 || !this.UserID) {
        this.toastService.error('Please select at least one image and ensure you are logged in.');
        return;
    }

    let moduletype = this.data?.uploadInfo?.modulename || this.uploadInfo?.modulename;
    if (!moduletype) {
        this.toastService.error('Upload type is missing.');
        return;
    }

    this.isUploading = true;
    this.uploadProgress = 0;
    let uploadedCount = 0; // Track completed uploads
    this.imageUrl = []; // Ensure imageUrl is initialized properly
    

    this.selectedFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64String = reader.result?.toString().split(',')[1];
            if (!base64String) {
                this.toastService.error('Error reading file. Please try again.');
                this.isUploading = false;
                return;
            }
            // this.imagePreviews.push(reader.result as string);
            const timestamp = Date.now();
            const Data = {
                fileName: `${moduletype}_${this.UserID}_${timestamp}_${index}`,
                modulename: moduletype,
                imageData: `data:${file.type};base64,${base64String}`,
                userID: this.UserID,
            };

            let uploadService = Data ? this._UploadService.uploads(Data) : null;

            if (!uploadService) {
                this.toastService.error('Invalid upload type.');
                this.isUploading = false;
                return;
            }

            // **Upload Progress Bar Simulation**
            // **Progress Bar Animation for 3 seconds**
      const duration = 3000; // 3 seconds
      const intervalTime = 100; // Update every 100ms
      const step = Math.ceil(100 / (duration / intervalTime)); // Ensure whole numbers
  
      const interval = setInterval(() => {
        if (this.uploadProgress < 100) {
          this.uploadProgress = Math.min(this.uploadProgress + step, 100);
          this._changeDetectorRef.detectChanges();
        } else {
          clearInterval(interval);
          this.toastService.success('Upload complete!');
        }
      }, intervalTime);

            // **Upload Process**
            uploadService.subscribe({
                next: (response) => {
                    this.imageUrl.push(response.url); // Store uploaded image URLs
                    this.toastService.success(`Image ${index + 1} uploaded successfully!`);
                },
                error: () => {
                    this.toastService.error(`Upload failed for image ${index + 1}, please try again.`);
                    clearInterval(interval);
                    this.isUploading = false;
                    this.uploadProgress = 0;
                    this._changeDetectorRef.detectChanges();
                },
                complete: () => {
                    uploadedCount++;
                    if (uploadedCount === this.selectedFiles.length) {
                        setTimeout(() => {
                            this.isUploading = false;
                            this.resetForm();
                        }, 500);
                    }
                }
            });
        };
    });
}

resetForm(): void {
    this.selectedFiles = [];
    this.imagePreviews = []; // Ensure imagePreview is correctly initialized
    this.uploadProgress = 0;
    this.isUploading = false;

    if (this.fileInput) {
        (this.fileInput as HTMLInputElement).value = '';
    }

    this._changeDetectorRef.detectChanges();
}
}