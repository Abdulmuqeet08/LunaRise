import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { TRAConfirmationService } from '@fuse/services/confirmation';
import { CostType } from 'app/modules/admin/apps/costtype/costtype.types';
import { CostTypeListComponent } from 'app/modules/admin/apps/costtype/list/list.component';
import { CostTypesService } from 'app/modules/admin/apps/costtype/costtype.service';

@Component({
    selector       : 'costtype-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CostTypesDetailsComponent implements OnInit, OnDestroy
{
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

    editMode: boolean = false;
    tagsEditMode: boolean = false;
    costtype: CostType;
    costtypeForm: FormGroup;
    costtypes: CostType[];
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _costtypeListComponent: CostTypeListComponent,
        private _costtypeService: CostTypesService,
        private _formBuilder: FormBuilder,
        private _TRAConfirmationService: TRAConfirmationService,
        private _renderer2: Renderer2,
        private _router: Router,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Open the drawer
        this._costtypeListComponent.matDrawer.open();

        // Create the costtype form
        this.costtypeForm = this._formBuilder.group({
            id          : [''],           
            Name        : ['', [Validators.required]],           
            Description       : [''],
            Status     : ['Active']           
        });

        // Get the costtype
        this._costtypeService.costtypes$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((costtypes: CostType[]) => {
                this.costtypes = costtypes;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the costtype
        this._costtypeService.costtype$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((costtype: CostType) => {

                // Open the drawer in case it is closed
                this._costtypeListComponent.matDrawer.open();

                // Get the costtype
                this.costtype = costtype;

                // Clear the Names and Descriptions form arrays
                (this.costtypeForm.get('Names') as FormArray).clear();
                (this.costtypeForm.get('Descriptions') as FormArray).clear();

                // Patch values to the form
                this.costtypeForm.patchValue(costtype);

                // Setup the Names form array
                const NameformGroups = [];

                // if ( costtype.Names.length > 0 )
                // {
                //     // Iterate through them
                //     costtype.Names.forEach((Name) => {

                //         // Create an Name form group
                //         NameformGroups.push(
                //             this._formBuilder.group({
                //                 Name: [Name.Name],
                //                 label: [Name.label]
                //             })
                //         );
                //     });
                // }
                // else
                // {
                    // Create an Name form group
                    NameformGroups.push(
                        this._formBuilder.group({
                            Name: [''],
                            label: ['']
                        })
                    );
             //   }

                // Add the Name form groups to the Names form array
                NameformGroups.forEach((NameFormGroup) => {
                    (this.costtypeForm.get('Names') as FormArray).push(NameFormGroup);
                });

                // Setup the phone numbers form array
                const DescriptionsFormGroups = [];

                // if ( costtype.Descriptions.length > 0 )
                // {
                //     // Iterate through them
                //     costtype.Descriptions.forEach((Description) => {

                //         // Create an Name form group
                //         DescriptionsFormGroups.push(
                //             this._formBuilder.group({
                //                 Description: [Description.Description],
                //                 label      : [Description.label]
                //             })
                //         );
                //     });
                // }
                // else
                // {
                    // Create a phone number form group
                    DescriptionsFormGroups.push(
                        this._formBuilder.group({
                            Description: [''],
                            label      : ['']
                        })
                    );
              //  }

                // Add the phone numbers form groups to the phone numbers form array
                DescriptionsFormGroups.forEach((DescriptionsFormGroup) => {
                    (this.costtypeForm.get('Descriptions') as FormArray).push(DescriptionsFormGroup);
                });

                // Toggle the edit mode off
                this.toggleEditMode(false);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

       
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        // Dispose the overlays if they are still on the DOM
        if ( this._tagsPanelOverlayRef )
        {
            this._tagsPanelOverlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._costtypeListComponent.matDrawer.close();
    }

    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void
    {
        if ( editMode === null )
        {
            this.editMode = !this.editMode;
        }
        else
        {
            this.editMode = editMode;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Update the costtype
     */
    updateCostType(): void
    {
        // Get the costtype object
        const costtype = this.costtypeForm.getRawValue();

        // Go through the costtype object and clear empty values
        costtype.Names = costtype.Names.filter(Name => Name.Name);

        costtype.Descriptions = costtype.Descriptions.filter(Description => Description.Description);

        // Update the costtype on the server
        this._costtypeService.updateCostType(costtype.id, costtype).subscribe(() => {

            // Toggle the edit mode off
            this.toggleEditMode(false);
        });
    }

    /**
     * Delete the costtype
     */
    deleteCostType(): void
    {
        // Open the confirmation dialog
        const confirmation = this._TRAConfirmationService.open({
            title  : 'Delete costtype',
            message: 'Are you sure you want to delete this costtype? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if ( result === 'confirmed' )
            {
                // Get the current costtype's id
                const id = this.costtype.id;

                // Get the next/previous costtype's id
                const currentContactIndex = this.costtypes.findIndex(item => item.id === id);
                const nextContactIndex = currentContactIndex + ((currentContactIndex === (this.costtypes.length - 1)) ? -1 : 1);
                const nextContactId = (this.costtypes.length === 1 && this.costtype[0].id === id) ? null : this.costtype[nextContactIndex].id;

                // Delete the costtype
                this._costtypeService.deleteCostType(id)
                    .subscribe((isDeleted) => {

                        // Return if the costtype wasn't deleted...
                        if ( !isDeleted )
                        {
                            return;
                        }

                        // Navigate to the next costtype if available
                        if ( nextContactId )
                        {
                            this._router.navigate(['../', nextContactId], {relativeTo: this._activatedRoute});
                        }
                        // Otherwise, navigate to the parent
                        else
                        {
                            this._router.navigate(['../'], {relativeTo: this._activatedRoute});
                        }

                        // Toggle the edit mode off
                        this.toggleEditMode(false);
                    });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });

    }

    /**
     * Upload avatar
     *
     * @param fileList
     */
    uploadAvatar(fileList: FileList): void
    {
        // Return if canceled
        if ( !fileList.length )
        {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];

        // Return if the file is not allowed
        if ( !allowedTypes.includes(file.type) )
        {
            return;
        }

        // Upload the avatar
        // this._costtypeService.uploadAvatar(this.costtype.id, file).subscribe();
    }

    /**
     * Remove the avatar
     */
    removeAvatar(): void
    {
        // Get the form control for 'avatar'
        const avatarFormControl = this.costtypeForm.get('avatar');

        // Set the avatar as null
        avatarFormControl.setValue(null);

        // Set the file input value as null
        this._avatarFileInput.nativeElement.value = null;

        // Update the costtype
        // this.costtype.avatar = null;
    }

    /**
     * Open tags panel
     */
    openTagsPanel(): void
    {
        // Create the overlay
        this._tagsPanelOverlayRef = this._overlay.create({
            backdropClass   : '',
            hasBackdrop     : true,
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                                  .flexibleConnectedTo(this._tagsPanelOrigin.nativeElement)
                                  .withFlexibleDimensions(true)
                                  .withViewportMargin(64)
                                  .withLockedPosition(true)
                                  .withPositions([
                                      {
                                          originX : 'start',
                                          originY : 'bottom',
                                          overlayX: 'start',
                                          overlayY: 'top'
                                      }
                                  ])
        });

        // Subscribe to the attachments observable
        this._tagsPanelOverlayRef.attachments().subscribe(() => {

            // Add a class to the origin
            this._renderer2.addClass(this._tagsPanelOrigin.nativeElement, 'panel-opened');

            // Focus to the search input once the overlay has been attached
            this._tagsPanelOverlayRef.overlayElement.querySelector('input').focus();
        });

        // Create a portal from the template
        const templatePortal = new TemplatePortal(this._tagsPanel, this._viewContainerRef);

        // Attach the portal to the overlay
        this._tagsPanelOverlayRef.attach(templatePortal);

        // Subscribe to the backdrop click
        this._tagsPanelOverlayRef.backdropClick().subscribe(() => {

            // Remove the class from the origin
            this._renderer2.removeClass(this._tagsPanelOrigin.nativeElement, 'panel-opened');

            // If overlay exists and attached...
            if ( this._tagsPanelOverlayRef && this._tagsPanelOverlayRef.hasAttached() )
            {
                // Detach it
                this._tagsPanelOverlayRef.detach();

                // Reset the tag filter
                // this.filteredTags = this.tags;

                // Toggle the edit mode off
                this.tagsEditMode = false;
            }

            // If template portal exists and attached...
            if ( templatePortal && templatePortal.isAttached )
            {
                // Detach it
                templatePortal.detach();
            }
        });
    }

    /**
     * Toggle the tags edit mode
     */
    toggleTagsEditMode(): void
    {
        this.tagsEditMode = !this.tagsEditMode;
    }

   
    /**
     * Add the Name field
     */
    addEmailField(): void
    {
        // Create an empty Name form group
        const NameFormGroup = this._formBuilder.group({
            Name: [''],
            label: ['']
        });

        // Add the Name form group to the Names form array
        (this.costtypeForm.get('Names') as FormArray).push(NameFormGroup);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove the Name field
     *
     * @param index
     */
    removeEmailField(index: number): void
    {
        // Get form array for Names
        const NamesFormArray = this.costtypeForm.get('Names') as FormArray;

        // Remove the Name field
        NamesFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Add an empty phone number field
     */
    addPhoneNumberField(): void
    {
        // Create an empty phone number form group
        const DescriptionFormGroup = this._formBuilder.group({
            country    : ['us'],
            Description: [''],
            label      : ['']
        });

        // Add the phone number form group to the Descriptions form array
        (this.costtypeForm.get('Descriptions') as FormArray).push(DescriptionFormGroup);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove the phone number field
     *
     * @param index
     */
    removePhoneNumberField(index: number): void
    {
        // Get form array for phone numbers
        const DescriptionsFormArray = this.costtypeForm.get('Descriptions') as FormArray;

        // Remove the phone number field
        DescriptionsFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
