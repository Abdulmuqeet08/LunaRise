import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionService } from '../../../../services/session.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  getLatestPosts() {
    throw new Error('Method not implemented.');
  }
  value: any;



  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _profileData: BehaviorSubject<any | null> = new BehaviorSubject(null);
  private _cycleData = new BehaviorSubject<any>(null);
  public cycleData$ = this._cycleData.asObservable();
  

  constructor(private _sessionService: SessionService, private http: HttpClient) {}

  get isLoading$(): Observable<boolean> {
    return this._isLoading.asObservable();
  }

  get profileData$(): Observable<any> {
    return this._profileData.asObservable();
  }


  insertCycleData(cycleData) {
    this._sessionService.insertCycleData(cycleData).subscribe((response: any) => {
      if (response.success) {
        console.log("Cycle data saved successfully:", response);
      } else {
        console.error("Failed to save cycle data:", response);
      }
    });
  }

  
  /** Get User Profile */
  getUserProfile(UserID) {
    this._sessionService.getUserProfile(UserID).subscribe(async (response: any) => {
      if (response.entity.UserID) {
        this._profileData.next(response.entity);
      }
    });
  }


 
}

export { SessionService };
