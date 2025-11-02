import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UploadConfig, UploadedFile } from './models/upload-config.interface';
import { UploadService } from './upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  @Input() config: UploadConfig = {
    accept: ['.jpg', '.jpeg', '.png', '.pdf'],  // default accepted file types
    maxFileSize: 5 * 1024 * 1024,  // default 5MB
    label: 'Upload Files',
    hint: 'Supported file types and size limits shown below',
    id: 'default',
    multiple: true
  };
  @Output() filesChanged = new EventEmitter<File[]>();
  @ViewChild('fileInput') fileInput: ElementRef;

  files: UploadedFile[] = [];
  dragging = false;

  constructor(
    private uploadService: UploadService,
    private snackBar: MatSnackBar
  ) {}

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    this.dragging = false;
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  private handleFiles(fileList: FileList): void {
    const files = Array.from(fileList);
    
    // Validate file types
    const invalidFiles = files.filter(file => 
      !this.config.accept.some(type => 
        file.name.toLowerCase().endsWith(type.toLowerCase())
      )
    );

    if (invalidFiles.length > 0) {
      this.snackBar.open('Invalid file type(s) selected', 'Close', { duration: 3000 });
      return;
    }

    // Validate file size
    const oversizedFiles = files.filter(file => file.size > this.config.maxFileSize);
    if (oversizedFiles.length > 0) {
      this.snackBar.open('Some files exceed the maximum file size', 'Close', { duration: 3000 });
      return;
    }

    // Validate total files
    if (this.config.maxFiles && (this.files.length + files.length) > this.config.maxFiles) {
      this.snackBar.open(`Maximum ${this.config.maxFiles} files allowed`, 'Close', { duration: 3000 });
      return;
    }

    // Add files to the list
    files.forEach(file => {
      this.files.push({
        file,
        progress: 0,
        status: 'pending'
      });
    });

    this.filesChanged.emit(files);
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.filesChanged.emit(this.files.map(f => f.file));
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragging = false;
  }

  uploadFiles(): void {
    const uploads = this.files
      .filter(f => f.status === 'pending')
      .map(fileObj => {
        fileObj.status = 'uploading';
        return this.uploadService
          .uploadFile(fileObj.file, this.config.id)
          .subscribe({
            next: (progress) => {
              fileObj.progress = progress.progress;
              fileObj.status = progress.status;
              if (progress.error) {
                fileObj.errorMessage = progress.error;
              }
            },
            error: (error) => {
              fileObj.status = 'error';
              fileObj.errorMessage = error.message;
              this.snackBar.open(
                `Failed to upload ${fileObj.file.name}`, 
                'Close', 
                { duration: 3000 }
              );
            },
            complete: () => {
              if (fileObj.status === 'success') {
                this.snackBar.open(
                  `Successfully uploaded ${fileObj.file.name}`, 
                  'Close', 
                  { duration: 3000 }
                );
              }
            }
          });
      });

    forkJoin(uploads).subscribe({
      complete: () => {
        this.filesChanged.emit(
          this.files
            .filter(f => f.status === 'success')
            .map(f => f.file)
        );
      }
    });
  }

  hasPendingFiles(): boolean {
    return this.files.some(f => f.status === 'pending');
  }
} 