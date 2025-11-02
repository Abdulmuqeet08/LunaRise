import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionService } from '../../../../services/session.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    value: any;

    getUserSkills() {
        throw new Error('Method not implemented.');
    }

    updateUserSkills(value: any) {
        throw new Error('Method not implemented.');
    }

    private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private _profileData: BehaviorSubject<any | null> = new BehaviorSubject(null);

    constructor(private _sessionService: SessionService) {}

    get isLoading$(): Observable<boolean> {
        return this._isLoading.asObservable();
    }

    get profileData$(): Observable<any> {
        return this._profileData.asObservable();
    }

    /** ✅ Get User Profile */
    getUserProfile(UserID){
    
        this._sessionService.getUserProfile(UserID).subscribe(async (response: any) => {
          
            if (response.entity.ProfileID) {
                
                
                this._profileData.next(response.entity);
            }
                
            });
        }




  

    createnewprofile(profileData){
    
        this._sessionService.createUserProfile(profileData).subscribe(async (response: any) => {
            
            if (response.entity.ProfileID) {
                
                
                this._profileData.next(response.entity);
            }
                
            });
        }

    


    uploadavatar(imageData: any): Observable<any> {      
        return new Observable(observer => {
            this._sessionService.uploadavatar(imageData).subscribe(
                
                (response: any) => {
                    if (response && response.entity && response.entity.imagePath) {
                       
    
                        // ✅ Updating profile data with new image path
                        this._profileData.next(response.entity);
    
                        // ✅ Pass image path to component
                        observer.next({ imagePath: response.entity.imagePath });
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
