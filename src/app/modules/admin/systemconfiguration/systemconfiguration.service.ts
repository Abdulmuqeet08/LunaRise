import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SessionService } from 'app/services/session.service';
import { HotToastService } from '@ngneat/hot-toast';
import { IconsService } from "../ui/icons/icons.service";



@Injectable({
    providedIn: 'root'
})
export class SystemConfigurationService{

    private _entity: BehaviorSubject<number | null> = new BehaviorSubject(null);
    private _entityName: BehaviorSubject<string | null> = new BehaviorSubject(null);
    private _maxID: BehaviorSubject<string | null> = new BehaviorSubject(null);
    private _action: BehaviorSubject<string | null> = new BehaviorSubject(null);
    private _formValues: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _dataSource: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _userRoles: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _userList: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _EntityList: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _isLoading: BehaviorSubject<boolean| false> = new BehaviorSubject(false);
    private _mode: BehaviorSubject<string | null> = new BehaviorSubject(null);

    constructor( 
        public _sessionService:SessionService,
        private toastService: HotToastService,
        private _iconsService: IconsService
        ){}

    setAction(entity:string){
        this._action.next(entity);
    }

    setFormValues(editRecord:any){
        this._formValues.next(editRecord);
    }

    setMaxID(entity:string){
        this._maxID.next(entity);
    }


    get isLoading$(): Observable<any>
    {
        return this._isLoading.asObservable();
    }

    get mode$(): Observable<any>
    {
        return this._mode.asObservable();
    }

    get entity$(): Observable<any>
    {
        return this._entity.asObservable();
    }

    get entityName$(): Observable<any>
    {
        return this._entityName.asObservable();
    }

    get action(): Observable<any>
    {
        return this._action.asObservable();
    }


    get formValues(): Observable<any>
    {
        return this._formValues.asObservable();
    }


    get dataSource$(): Observable<any>
    {
        return this._dataSource.asObservable();
    }

    get maxID(): Observable<any>
    {
        return this._maxID.asObservable();
    }

    
    get entityList$(): Observable<any>
    {
        return this._EntityList.asObservable();
    }

    get userRoles$(): Observable<any>
    {
        return this._userRoles.asObservable();
    }

    get userList$(): Observable<any>
    {
        return this._userList.asObservable();
    }
    //Entity Module Begins
    getMenuItemList(value) {    
     //   alert("menu called") 

        this.toastService.info("Fetcing Menu Data",{
            position: 'top-right'
          })     
               
        this._isLoading.next(true);
        this._sessionService.getMenuDetails().subscribe(async (response: any) => {
          // alert(JSON.stringify(response))
            if (!response.status) {  
                this.toastService.error(response.message,{
                    position: 'top-right'
                  })    
                  this._isLoading.next(false);                    
            } 
            else {
                this._dataSource.next(response.entity);
                this._isLoading.next(false);    
                this.getUserRoles();  
                if(value!='')
                this._iconsService.getIcons(value);
            }
            // console.log("check data")
      });
 
    }

    editMenu(values){     
        this._isLoading.next(true);  
        this._sessionService.updateMenuDetails(values).subscribe(
            (response: any) => {
                if (!response.status) {  
                    this.toastService.error('Menu Record Upsert Failed!',{
                        position: 'top-right'
                    })  
                    this._isLoading.next(false);       
                } 
                else {
                this.toastService.success('Menu Record Upsert Successfully!',{
                    position: 'top-right'
                })
            this.getMenuItemList('');  
            this._isLoading.next(false);
                }     
            }          
        );  
        // console.log(values)      
    }

    getUserRoles() {         
        this.toastService.info("Fetcing User Roles Data",{
            position: 'top-right'
        })
        this._sessionService.getUserRoleList().subscribe(async (response: any) => { 
            if (!response.status) {  
                this.toastService.error(response.message+'repeat',{
                    position: 'top-right'
                })   
                this._isLoading.next(false);                     
            } 
            else {
                this._userRoles.next(response.entity);
                this._isLoading.next(false); 
            }
    });
    }

   
}