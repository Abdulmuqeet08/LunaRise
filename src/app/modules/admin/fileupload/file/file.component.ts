import { Component, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { SessionService } from 'app/services/session.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TRAConfirmationService } from '@fuse/services/confirmation';
import { ActivatedRoute } from '@angular/router';
import { FileUploadService } from 'app/modules/admin/fileupload/fileupload.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Auth } from 'app/models/auth';
import { IdentityService } from 'app/services/identity.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { HttpClient } from '@angular/common/http';
//import { SystemConfigurationFormComponent } from 'app/modules/admin/systemconfiguration/form/form.component';




@Component({
  selector: 'file.component',
  styleUrls: ['file.component.css'],
  templateUrl: 'file.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FileComponent implements AfterViewInit {
  /**
   * Constructor
   */
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  entityForm: FormGroup;
  menuForm: FormGroup;
  hideCols: any = [];
  isLoading: boolean = false;
displayedColumns: string[] = ['EntityID', 'EntityName', 'Action'];
  //selectedFile: File | null = null;
  fileName: any;
  selectedFile: File;

  displayedColumnsHeaders: any = [];
  auth:Auth;
  mode: any;
  // dataSource:any=[];
  maxID:any;
  dataSource = new MatTableDataSource<any>();
exporter: any;
applyFilter: any;
  constructor(
    private route: ActivatedRoute,
    public _sessionService: SessionService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _liveAnnouncer: LiveAnnouncer,
    private _TRAConfirmationService: TRAConfirmationService,
    private _matDialog: MatDialog,
    private _identityService:IdentityService,
    private _httpClient: HttpClient,
    public _fileuploadService: FileUploadService 
  ) {
    this.auth=this._identityService.getAuth();
  }
  ngAfterViewInit(): void {
    // this.entityId = this._systemconfigurationService.entity$;
   // this.entityId = this._configurationService.entity$;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.isLoading = false;
  }

  // /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
  };

 
  


  openActionDialog(): void {

  }



  // onFileSelected(event: any) {
  //   alert("onFileSelected")
  //     this.selectedFile = event.target.files[0];
  //     console.log('Selected file:', this.selectedFile);
  //     // this.uploadFile();
  //   }

  onFileSelected(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      this.selectedFile = file;
    }
  
    //console.log('Selected file:', this.selectedFile);  
  }
    


    
    // onFileSelectedd(event: any) {
    //   this.selectedFile = event.target.files[0];
    //   console.log(this.selectedFile)
    //   this.onSubmit();
    // }
    
    // onSubmit() {
    //   if (this.selectedFile) {
    //     const formData = new FormData();
    //     formData.append('image', this.selectedFile, this.selectedFile.name);
    //     console.log("formData:",formData)
    //     this._httpClient.post('/devapi/uploadfile', formData,{
    //       headers: {
    //           // eslint-disable-next-line @typescript-eslint/naming-convention
    //           'Content-Type': 'multipart/form-data'
    //       }}).subscribe(
    //       (response) => {
    //         console.log('Image uploaded successfully');
    //       },
    //       (error) => {
    //         console.error('Error uploading image', error);
    //       }
    //     );
    //   }
    // }
  
}
