import { AfterViewInit, Component, OnInit, ViewChild, ViewChildren, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommunicationService } from 'app/services/communications.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
//import { SystemConfigurationFormComponent } from 'app/modules/admin/systemconfiguration/form/form.component';
import { SystemConfigurationService } from 'app/modules/admin/systemconfiguration/systemconfiguration.service';

import { SessionService } from 'app/services/session.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Auth } from 'app/models/auth';
import { IdentityService } from 'app/services/identity.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'form-compose',
    templateUrl: './form.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemConfigurationFormComponent implements OnInit {

    position = 'top-end';
    visible = false;
    percentage = 0;
    entityName: any;
    entityId: any;
    userRoles: any=[];
    userList: any;
    entityData: any;
    filtereduserRoles: any;
    userListFetched: boolean = true;
    filteredUserList: Observable<string[]>;
    selectedRoles:any=[];
    selectedParentId:any=[];
    id_Role:any=[];
    menu_id:any=[];
    parentMenus: any = [];
    showRoleSelection: boolean = false;
    selectedentityId: any;
    action: any;
    formMode: any = "Add";
    actionForm: FormGroup;
    flashMessage: 'success' | 'error' | null = null;
    menuValues: any;
    showAlert: boolean = false;
    copyFields: { cc: boolean; bcc: boolean } = {
        cc: false,
        bcc: false
    };

    messageDetails: any = [];
    formValues: any = [];
    mode: any;
    formFields: any;
    auth: Auth;
    fetchedEntityId: any;
    fetchedSubEntityId: any;
    id_user: any;
    partsSubTypeList: any;
    maxID:any;
    /**
     * Constructor
     */
    constructor(
        private route: ActivatedRoute,
        public matDialogRef: MatDialogRef<SystemConfigurationFormComponent>,
        private _formBuilder: FormBuilder,
        private _CommunicationService: CommunicationService,
        private _matDialog: MatDialog,
        public _systemconfigurationService: SystemConfigurationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _sessionService: SessionService,
        private toastService: HotToastService,
        private _identityService: IdentityService
    ) {
        this.auth = this._identityService.getAuth();
    }





    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.actionForm = this._formBuilder.group({
            menu_id: [''],
            menu_Title: [''],
            menu_Type: [''],
            menu_Icon: [''],
            menu_Link: [''],
            menu_parentId: [''],
            menu_isActive: [''],
            menu_userRole: ['']
        });

        this._systemconfigurationService.action.subscribe((value) => {
            this.mode = value;

            //  alert("mode:"+this.mode)
        });
        this._systemconfigurationService.maxID.subscribe((value) => {
            this.maxID = value;
        });
       
        this._systemconfigurationService.dataSource$.subscribe((menuData) => {
            this.parentMenus = menuData;           
           console.log("Parent menu items:",this.parentMenus)
        });

 
        

        this._systemconfigurationService.userRoles$.subscribe((value) => {
            this.id_Role = value;     
            console.log("user role :",this.id_Role)      
            this._changeDetectorRef.markForCheck(); 
        });

        this._systemconfigurationService.formValues.subscribe((menuItem) => {
            this.menuValues = menuItem;
            
            const selectedRolesReceived=this.menuValues.menu_userRole.split(",");
            for(var i=0;i<selectedRolesReceived.length;i++){
              
                let selectedCT = this.id_Role.find(a => a.id_Role == selectedRolesReceived[i]);
             //  alert(JSON.stringify(selectedCT))
                this.selectedRoles.push(selectedCT.id_Role)
                
            }
         //   alert(this.selectedRoles)
            var parentId  = this.menuValues.menu_parentId.split(",");
            this.selectedParentId.push(parentId[0])
          //  alert(this.selectedParentId);
            this._changeDetectorRef.markForCheck(); 

           
        });

        if (this.mode == 'Edit') {
            this.formMode = this.mode;
            this.actionForm = this._formBuilder.group({
                menu_id: [{ value: '', disabled: true }],
                menu_Title: [''],
                menu_Type: [''],
                menu_Icon: [''],
                menu_Link: [''],
                menu_parentId: [''],
                menu_isActive: [''],
                menu_userRole: ['']
            });
            setTimeout(() => {
                this.actionForm.patchValue({
                    menu_id: this.menuValues.menu_id,
                    menu_Title: this.menuValues.menu_Title,
                    menu_Type: this.menuValues.menu_Type,
                    menu_Icon: this.menuValues.menu_Icon,
                    menu_Link: this.menuValues.menu_Link,
                    menu_parentId: this.selectedParentId,
                    menu_isActive: this.menuValues.menu_isActive,
                    menu_userRole: this.selectedRoles,
                    menu_isActivemenu_isActive: this.menuValues.menu_isActivemenu_isActive
                });
            }, 500);
            this._changeDetectorRef.markForCheck();
        }
        else {
            this.actionForm = this._formBuilder.group({
                menu_id: [{ value: '', disabled: true }],
                menu_Title: [''],
                menu_Type: [''],
                menu_Icon: [''],
                menu_Link: [''],
                menu_parentId: [''],
                menu_isActive: [''],
                menu_userRole: ['']
            });
            this.actionForm.patchValue({
                menu_id: this.maxID,               
            });
        }

    }

   

    private filterdUsers(value: string): any {
        let filterValue = String(value).toLowerCase();
        let userdata = this.userList.filter(option => String(option.user_name).toLowerCase().includes(filterValue));
        this._changeDetectorRef.markForCheck();
        return userdata;
    }

    setRoleFilter(value) {
        var filteredValues = this.userRoles.filter(function (el) {
            return el.id_Module_Type == value;
        }
        );
        this.filtereduserRoles = filteredValues;
    }

    escapeStr(str) {
        return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    saveAndClose(): void {
        // Save the message as a draft

        // Close the dialog
        this.matDialogRef.close();
    }



    verifyCodeAvailable(event) {
        this._sessionService.verifyCodeAvailable(event.target.value).subscribe(async (response: any) => {
            // alert(JSON.stringify(response))
            // alert(JSON.stringify(response.entity.rows[0]))
            if (response.entity.count > 0) {
                let resp = response.entity.rows[0];
                let entityType = "";
                switch (resp.id_entity_type) {
                    case 1:
                        entityType = "Plant";
                        break;
                    case 2:
                        entityType = "Depot";
                        break;
                    case 3:
                        entityType = "Distributor";
                        break;
                    case 4:
                        entityType = "Dealer";
                        break;
                    case 5:
                        entityType = "Production Line";
                        break;
                }

                let message = entityType + " with following details exists.<br>Code :" + resp.id_entity + "<br>Name:" + resp.entity_name;
                this.toastService.error("Entity Code is not Available.<br><br>" + message + " <br><br>Please choose a different Code", {
                    position: 'top-right'
                });
                event.target.value = '';
                event.target.focus();
                event.target.invalid;
                this._changeDetectorRef.markForCheck();
            }
            else {

                this.toastService.success("Entity Code Available", {
                    position: 'top-right'
                })


                this._changeDetectorRef.markForCheck();
            }
        });
    }



    submit() {
        if (this.actionForm.valid) {
           
            this.formValues = this.actionForm.getRawValue();
          //  alert(JSON.stringify( this.formValues))
            
            this._systemconfigurationService.editMenu(this.formValues)
            this._changeDetectorRef.markForCheck();
                this.matDialogRef.close();
        }
    }


    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {

            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }
}
