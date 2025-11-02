import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SessionService } from 'app/services/session.service';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpClient } from "@angular/common/http";



@Injectable({
    providedIn: 'root'
})
export class FileUploadService{

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
        private _httpClient: HttpClient,
        public _sessionService:SessionService,
        private toastService: HotToastService
        ){}

    setAction(entity:string){
        this._action.next(entity);
    }

    setFormValues(editRecord:any){
        this._formValues.next(editRecord);
    }

    get isLoading$(): Observable<any>
    {
        return this._isLoading.asObservable();
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
}