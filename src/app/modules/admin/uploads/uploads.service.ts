import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionService } from '../../../services/session.service';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    value: any;

 
    constructor(private _sessionService: SessionService) {}

    
   
   


    uploads(Data): Observable<any> {      
        return new Observable(observer => {
          
            this._sessionService.uploads(Data).subscribe(
                
                (response: any) => {
                    if (response) {
                       
    
                      
                    } else {
                        observer.error('Invalid response from server');
                    }
                    observer.complete();
                },
                error => {
                    
                    observer.error(error);
                }
            );
        });
    }
}
