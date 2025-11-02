import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  GUEST_REG_URL,


  
  GET_USER_PROFILE_URL,       // URL for fetching user profile
  CREATE_USER_PROFILE_URL  ,   // URL for deleting profile sections


  
  GET_FORM_FIELD_OPTION_DETAILS_URL,
  USER_LOGIN_URL,
  USER_SIGNUP_URL,
  GET_APPCONFIG_URL,
  GET_USERNAMESTATUS_URL,
  GET_RESET_PASSWORD_REQUEST_URL,
  GET_USERMENU_URL,
  GET_MENUDETAILS_URL,
  UPDATE_MENUDETAILS_URL,
  Post_FormBuilder_URL,
  SAVE_FORMDETAILS_URL,
  GET_FORM_DATA_URL,
  GET_FORM_REPORTS_URL,
  Delete_FormDetails_URL,
  GET_EVENT_DETAILS_URL,
  GET_CONTACT_MASTER_LIST_URL,
  GET_CODESTATUS_URL,
  GET_USERROLELIST_URL,
  GET_FORMCONFIGURATION_URL,
  UPSERT_USER_CALENDAR_URL,
  UPSERT_USER_EVENTS_URL,
  CYCLE_INSERT_URL,
  CYCLE_DATA_URL,
  UPLOAD_MODULE_URL,


  
} from '../../@fuse/models/url';

import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  jobReportSource$: any;
  reportName$: any;
    
  
  constructor(private httpService: HttpService) { }

  isLoggedIn = false;
  
// for edit
getFormConfigurationRecord(formId){
  return this.httpService.postWithoutAuth(GET_FORMCONFIGURATION_URL, { formId });
  }
  createFormRecord(formData){
    return this.httpService.postWithoutAuth(Post_FormBuilder_URL, formData);
  }
  deleteFormData(payload){
    return this.httpService.postWithoutAuth(Delete_FormDetails_URL, payload);
  }
  
  getFormData(): Observable<any> {
    return this.httpService.getWithoutAuth(GET_FORM_REPORTS_URL);
  } 
  addGuestRecord(entity:any): Observable<any> {
    return this.httpService.postWithoutAuth(GUEST_REG_URL, { entity});
  }
  

uploads(imageData: any) {
  return this.httpService.postWithoutAuth(UPLOAD_MODULE_URL, imageData);
}

  submitFormRecord(formData: any): Observable<any> {
    return this.httpService.postWithAuth(SAVE_FORMDETAILS_URL, {formData });
  }
  getFormDetails(entity:any): Observable<any> {
    return this.httpService.postWithoutAuth(GET_FORM_DATA_URL, { entity});
  }

  getFormFieldOptionDetails(fieldId, dependentValue = null): Observable<any> {
    return this.httpService.postWithoutAuth(GET_FORM_FIELD_OPTION_DETAILS_URL, { fieldId, dependentValue });
  }

  userLogin(username: string, password: string): Observable<any> {
    return this.httpService.postWithAuth(USER_LOGIN_URL, { username, password });
  }

  getUserMenu(entity: any): Observable<any> {
    // alert("calling url")
    return this.httpService.postWithAuth(GET_USERMENU_URL, { entity });
  }

  getPasswordResetRequests(entityId: string): Observable<any> {
    return this.httpService.postWithAuth(GET_RESET_PASSWORD_REQUEST_URL, { entityId });
  }

  signup(entity: string): Observable<any> {
    return this.httpService.postWithAuth(USER_SIGNUP_URL, { entity });
  }
  

  verifyUserName(entity: string): Observable<any> {
    return this.httpService.postWithAuth(GET_USERNAMESTATUS_URL, { entity });
  }

  

  upsertAppConfig(entity: any): Observable<any> {
    // alert("calling url")
    return this.httpService.postWithAuth(GET_APPCONFIG_URL, { entity });
  }



 
  getMenuDetails(): Observable<any> {
    return this.httpService.getWithAuth(GET_MENUDETAILS_URL);
  }

  updateMenuDetails(values: any): Observable<any> {
    return this.httpService.putWithAuth(UPDATE_MENUDETAILS_URL, values);
  }

  getUserevents(UserId: string): Observable<any> {
    return this.httpService.postWithAuth(GET_EVENT_DETAILS_URL, { UserId });
  }

  upsertEventsDetails(entity: any): Observable<any> {
    return this.httpService.postWithAuth(UPSERT_USER_EVENTS_URL, { entity });
  }

  upsertUserCalendar(entity: any): Observable<any> {
    return this.httpService.postWithAuth(UPSERT_USER_CALENDAR_URL, { entity });
  }
  
  getContactMasterList(entityDetails: any): Observable<any> {
    return this.httpService.postWithAuth(GET_CONTACT_MASTER_LIST_URL, entityDetails)
    // supervisor API
  }

  verifyCodeAvailable(entity: string): Observable<any> {
    return this.httpService.postWithAuth(GET_CODESTATUS_URL, { entity });
  }

  getUserRoleList(): Observable<any> {
    return this.httpService.getWithAuth(GET_USERROLELIST_URL);
  }

  //profile 
  
getUserProfile(entity:any): Observable<any> {
  return this.httpService.postWithoutAuth(GET_USER_PROFILE_URL, { entity});
}
createUserProfile(entity): Observable<any> {
  return this.httpService.postWithoutAuth(CREATE_USER_PROFILE_URL, {entity});
}

// insertCycleData(cycleData: any): Observable<any> {
//   return this.httpService.postWithAuth(CYCLE_INSERT_URL, { cycleData });
// }
insertCycleData(cycleData: any): Observable<any> {
  return this.httpService.postWithAuth(CYCLE_INSERT_URL, cycleData); 
}

getCycleData(userId: number): Observable<any> {
  return this.httpService.postWithAuth(CYCLE_DATA_URL, { UserID: userId });
}


fetchEventNotifications(entity: any): Observable<any> {
  return this.httpService.postWithAuth(GET_EVENT_DETAILS_URL, { entity });
  }
}

