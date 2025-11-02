import { Component, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { SessionService } from 'app/services/session.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TRAConfirmationService } from '@fuse/services/confirmation';
import { ActivatedRoute } from '@angular/router';
import { SystemConfigurationService } from 'app/modules/admin/systemconfiguration/systemconfiguration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Auth } from 'app/models/auth';
import { IdentityService } from 'app/services/identity.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { SystemConfigurationFormComponent } from 'app/modules/admin/systemconfiguration/form/form.component';




@Component({
  selector: 'menu.component',
  styleUrls: ['menu.component.css'],
  templateUrl: 'menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MenuComponent implements AfterViewInit {
  /**
   * Constructor
   */
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  entityId: any;
  entityName: any;
  entityForm: FormGroup;
  menuId: any;
  menuName: any;
  menuForm: FormGroup;
  hideCols: any = [];
  isLoading: boolean = false;
  //displayedColumns: string[] = ['EntityID', 'EntityName', 'Action'];
  displayedColumns: string[] = ['menu_id', 'menu_Title', 'menu_Type', 'menu_Icon', 'menu_Link', 'menu_parentId', 'menu_isActive', 'menu_userRole'];
 
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
 // private _idmenuService:IdmenuService
    public _systemconfigurationService: SystemConfigurationService 
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
    this.isLoading = true;
    this.hideCols = [6, 7];
    this.displayedColumns = ['menu_id', 'menu_Title', 'menu_Type', 'menu_Icon', 'menu_Link', 'menu_parent_label', 'menu_isActive', 'menu_userRole_label','Action'];
    this.displayedColumnsHeaders = ['Id', 'Title', 'Type', 'Icon', 'Link', 'Parent', 'isActive', 'Access Roles','Action'];

    setTimeout(()=>{  
    this._systemconfigurationService.isLoading$.subscribe((value) => {
      this.isLoading = value;
    });
   
    this._systemconfigurationService.dataSource$.subscribe(
      data => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
        this._changeDetectorRef.markForCheck();
        this.maxID=this.getNextId(data);
        
      }
    )    
  }, 1000); 
  }

  getNextId(obj) {
    return (Math.max.apply(Math, obj.map(function(o) {
      return o.menu_id;
    })) + 1);
  }

  openActionDialog(): void {
    //Open the dialog
    this._systemconfigurationService.setMaxID(this.maxID);
    const dialogRef = this._matDialog.open(SystemConfigurationFormComponent);
 
    dialogRef.afterClosed()
      .subscribe((result) => {
        let editRecord = {
          menu_id: [{ value: ''}],
                menu_Title: [''],
                menu_Type: [''],
                menu_Icon: [''],
                menu_Link: [''],
                menu_parentId: [''],
                menu_isActive: [''],
                menu_userRole: ['']
        }
        this._systemconfigurationService.setAction('');
        this._systemconfigurationService.setFormValues(editRecord);
      });
  }

  editSelectedMenu(element): void {
  //  Open the confirmation dialog
    const confirmation = this._TRAConfirmationService.open({
      title: 'Edit Menu',
      message: 'Are you sure you want to edit this Menu Item?',
      actions: {
        confirm: {
          label: 'Edit'
        }
      }
    });

    confirmation.afterClosed().subscribe((result) => {

      if (result === 'confirmed') {
        this._systemconfigurationService.setAction('Edit');
        this._systemconfigurationService.setFormValues(element);
        console.log(element,"element")
        this.openActionDialog();
      }
    });
  }

  deleteSelectedMenu(element): void {
    //  Open the confirmation dialog
      const confirmation = this._TRAConfirmationService.open({
        title: 'Delete Menu',
        message: 'Are you sure you want to delete this Menu Item?',
        actions: {
          confirm: {
            label: 'Delete'
          }
        }
      });
  
      confirmation.afterClosed().subscribe((result) => {
        element.menu_isActive=element.menu_isActive==1?0:1;
        if (result === 'confirmed') {          
            this._systemconfigurationService.editMenu(element)
        }
      });
    }  
}