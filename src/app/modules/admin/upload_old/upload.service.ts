import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface UploadResponse {
  success: boolean;
  fileUrl?: string;
  message?: string;
  error?: string;
}

export interface UploadProgress {
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  response?: UploadResponse;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = `${environment.API_URL}/upload`;

  constructor(private http: HttpClient) {}

  uploadFile(
    file: File, 
    uploadType: string, 
    additionalData?: Record<string, any>
  ): Observable<UploadProgress> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', uploadType);

    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });
    }

    return this.http.post<UploadResponse>(
      `${this.apiUrl}/${uploadType}`,
      formData,
      {
        reportProgress: true,
        observe: 'events'
      }
    ).pipe(
      map(event => this.getUploadProgress(event)),
      retry(3), // Retry failed uploads 3 times
      catchError(this.handleError)
    );
  }

  uploadMultipleFiles(
    files: File[], 
    uploadType: string,
    additionalData?: Record<string, any>
  ): Observable<UploadProgress>[] {
    return files.map(file => this.uploadFile(file, uploadType, additionalData));
  }

  private getUploadProgress(event: HttpEvent<UploadResponse>): UploadProgress {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        const progress = Math.round(100 * event.loaded / (event.total || event.loaded));
        return {
          progress,
          status: 'uploading'
        };

      case HttpEventType.Response:
        if (event.body?.success) {
          return {
            progress: 100,
            status: 'success',
            response: event.body
          };
        } else {
          return {
            progress: 0,
            status: 'error',
            error: event.body?.error || 'Upload failed'
          };
        }

      default:
        return {
          progress: 0,
          status: 'pending'
        };
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred during upload';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || `Error Code: ${error.status}`;
    }

    return throwError(() => ({
      progress: 0,
      status: 'error',
      error: errorMessage
    }));
  }

  // Helper method to validate file before upload
  validateFile(file: File, maxSize: number, allowedTypes: string[]): string | null {
    if (file.size > maxSize) {
      return `File size exceeds ${this.formatFileSize(maxSize)}`;
    }

    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (!allowedTypes.includes(fileExtension)) {
      return `File type ${fileExtension} is not allowed`;
    }

    return null;
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}