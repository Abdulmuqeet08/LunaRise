
import { environment } from '../../environments/environment';

const { API_URL, communicationUrl } = environment;

const UrlParamsReplace = (url, params = {}) => {
    let urlWithPrefix = `${API_URL}${url}`;
    if (params) {
        Object.keys(params).forEach((key) => (urlWithPrefix = urlWithPrefix.replace(`:${key}`, params[key])));
    }
    return urlWithPrefix;

};


const getcommUrlParamsReplace = (url, params = {}) => {
    let urlWithPrefix = `${communicationUrl}${url}`;
    if (params) {
        Object.keys(params).forEach((key) => (urlWithPrefix = urlWithPrefix.replace(`:${key}`, params[key])));
    }
    return urlWithPrefix;
};
export const Delete_FormDetails_URL=UrlParamsReplace('reports/deleteFormId');
export const GET_FORM_REPORTS_URL=UrlParamsReplace('/FormDesigner/fetchFormData');
export const GET_DYNAMIC_FORM_URL = UrlParamsReplace('/FormBuilder/getFieldOptions');
export const Post_FormBuilder_URL=UrlParamsReplace('/FormBuilder/getFormBuilder');
export const GET_TABLE_NAMES_URL = UrlParamsReplace('/FormBuilder/getTableNames');
export const GET_TABLE_COLUMNS_URL = UrlParamsReplace('/FormBuilder/getTableColumns');
export const GET_FORMCONFIGURATION_URL = UrlParamsReplace('FormBuilder/edit');
export const GET_DYNAMICOPTTION_COLUMN_URL = UrlParamsReplace('/FormDesigner/getDynamicOptions');
// export const GET_REPORT_DATA_URL = UrlParamsReplace('reports/get-data');
export const GET_JOB_POSTINGS_REPORT_URL = UrlParamsReplace('/reports/job-postings');
export const GET_JOB_APPLICATIONS_REPORT_URL = UrlParamsReplace('/reports/job-applications');



export const SAVE_FORMDETAILS_URL = UrlParamsReplace('FormDesigner/SaveFormDetails');
export const GUEST_REG_URL = UrlParamsReplace('session/guest-reg');
export const GET_FORM_DATA_URL = UrlParamsReplace('FormDesigner/getFormData');
export const GET_FORM_FIELD_OPTION_DETAILS_URL = UrlParamsReplace('FormDesigner/getFieldOptions');
export const USER_SIGNUP_URL = UrlParamsReplace('session/signup');
// export const IMAGE_UPLOAD_URL = UrlParamsReplace('image/upload');

// export const UPLOAD_PROFILE_AVATAR=UrlParamsReplace('profile/avatar')
// export const UPLOAD_PROFILE_BANNER=UrlParamsReplace('profile/banner')
export const UPLOAD_MODULE_URL=UrlParamsReplace('Uploads')

export const SEND_NOTIFICATION_URL = getcommUrlParamsReplace('communications/sendNotification', {});

export const LOGIN_URL = UrlParamsReplace('session/admin-login');
export const RESET_PASSWORD_URL = UrlParamsReplace('session/resetPassword');
export const RESET_PASSWORD_REQUEST_URL = UrlParamsReplace('session/resetPasswordRequest');
export const GET_RESET_PASSWORD_REQUEST_URL = UrlParamsReplace('session/getPasswordResetRequests')
export const POST_REQUEST_APPROVAL_URL = UrlParamsReplace('session/approvePasswordRequest')

export const GET_USERMENU_URL = UrlParamsReplace('getMenuItems');

export const USER_LOGIN_URL = UrlParamsReplace('user/login');


//profile url
export const GET_USER_PROFILE_URL= UrlParamsReplace('/user-profile/get');
export const CREATE_USER_PROFILE_URL = UrlParamsReplace('/user-profile/create-profile');
export const CYCLE_INSERT_URL = UrlParamsReplace('/cycle/insert'); 
export const CYCLE_DATA_URL = UrlParamsReplace('/cycle/data');

export const GET_DYNAMIC_TABLE_DATA_URL = UrlParamsReplace('reports/get-table-data');


export const GET_MENUDETAILS_URL =  UrlParamsReplace('getmenulist');
export const UPDATE_MENUDETAILS_URL =  UrlParamsReplace('putmenuItems');

export const GET_APPCONFIG_URL=UrlParamsReplace('appconfig/upsert');
export const GET_USERNAMESTATUS_URL = UrlParamsReplace('verifyUsername');

export const GET_EVENT_DETAILS_URL=UrlParamsReplace('/event/getEventDetails');
export const GET_CONTACT_MASTER_LIST_URL = UrlParamsReplace('getcontent')
export const GET_CODESTATUS_URL = UrlParamsReplace('verifyCode');
export const GET_USERROLELIST_URL = UrlParamsReplace('getroles');
export const UPSERT_USER_CALENDAR_URL = UrlParamsReplace('userCalendar/upsert');
export const UPSERT_USER_EVENTS_URL = UrlParamsReplace('event/upsertEventsDetails');





