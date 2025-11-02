import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject, combineLatest, fromEvent, Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { CostTypesService } from 'app/modules/admin/apps/costtype/costtype.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenName } from '@angular/compiler';
import { P4UMediaWatcherService } from '@fuse/services/media-watcher';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CostType } from 'app/modules/admin/apps/costtype/costtype.types';
@Component({
    selector       : 'costtype-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CostTypeListComponent implements OnInit, OnDestroy
{
  costtypes$: Observable<CostType[]>;

  costtypCount: number = 0;
  costtypTableColumns: string[] = ['Name', 'Description','Status'];
  searchInputControl: FormControl = new FormControl();
  selectedCostType: CostType;
    filteredCostTypes: any=[];
    filters: {
        categorySlug$: BehaviorSubject<string>;
        query$: BehaviorSubject<string>;
        hideCompleted$: BehaviorSubject<boolean>;
    } = {
        categorySlug$ : new BehaviorSubject('all'),
        query$        : new BehaviorSubject(''),
        hideCompleted$: new BehaviorSubject(true)
    };

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    tabIndex: number = 0;
    drawerMode: 'side' | 'over';
    matDrawer: any;
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _costTypeService: CostTypesService, 
        @Inject(DOCUMENT) private _document: any,
        private _httpClient: HttpClient,
        public dialog: MatDialog,      
       
        private _P4UMediaWatcherService: P4UMediaWatcherService
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
        // Get the costtypes
     //   this.costtypes$ = this._costTypeService.costtypes$;
        this._costTypeService.costtypes$
            // .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: any) => {
console.log("costtypes",response)
                // Update the counts
              //  this.costtypCount = costtypes.length;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });



            this._costTypeService.costtype$
            // .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: any) => {             
                if (response=="api") {
                  alert('error')
                } else {
                    console.log(response)
                    // this.selectedCostType = response.entity;               
                    this._changeDetectorRef.markForCheck();
                }
            });

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap(query =>

                    // Search
                    this._costTypeService.searchCostTypes(query)
                )
            )
            .subscribe();

        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if ( !opened )
            {
                // Remove the selected contact when drawer closed
                this.selectedCostType = null;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });

        // Subscribe to media changes
        this._P4UMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode if the given breakpoint is active
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                }
                else
                {
                    this.drawerMode = 'over';
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Listen for shortcuts
        fromEvent(this._document, 'keydown')
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter<KeyboardEvent>(event =>
                    (event.ctrlKey === true || event.metaKey) // Ctrl or Cmd
                    && (event.key === '/') // '/'
                )
            )
            .subscribe(() => {
                this.createCostType();
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
     * Filter by search query
     *
     * @param query
     */
    filterByQuery(query: string): void
    {
        this.filters.query$.next(query);
    }

    /**
     * Filter by category
     *
     * @param change
     */
    filterByCategory(change: MatSelectChange): void
    {
        this.filters.categorySlug$.next(change.value);
    }

    /**
     * Show/hide completed courses
     *
     * @param change
     */
    toggleCompleted(change: MatSlideToggleChange): void
    {
        this.filters.hideCompleted$.next(change.checked);
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

  

       /**
     * On backdrop clicked
     */
    onBackdropClicked(): void
    {
        // Go back to the list
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    createCostType(): void
    {
        // Create the contact
        this._costTypeService.createCostType().subscribe((newCostType) => {

            // Go to the new contact
            this._router.navigate(['./', newCostType], {relativeTo: this._activatedRoute});

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }
}