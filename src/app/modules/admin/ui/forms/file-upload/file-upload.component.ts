import { Component } from '@angular/core';
@Component({
 selector: 'form-fileds',
 templateUrl: './file-upload.component.html'
})
export class FileUploadComponent {
 
 file: File = null;
 NGO_Id:any='';
 constructor(
 ){
 
 }

 onFilechange(event: any) {
   console.log(event.target.files[0])
   this.file = event.target.files[0]
 }
 
 upload() {
//    if (this.file) {
//      this._NGOService.uploadMou(this.file).subscribe(resp => {
//        alert("Uploaded")
//      })
//    } else {
//      alert("Please select a file first")
//    }
 }
}