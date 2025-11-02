export interface UploadConfig {
  id: string;
  label: string;
  accept: string[];  // e.g. ['.pdf', '.doc', '.docx']
  multiple: boolean;
  maxFileSize: number; // in bytes
  maxFiles?: number;
  required?: boolean;
  hint?: string;
  validators?: {
    [key: string]: any;
  };
}

export interface UploadedFile {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  errorMessage?: string;
} 