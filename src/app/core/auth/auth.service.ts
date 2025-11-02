import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Utf8 from 'crypto-js/enc-utf8';
import { cloneDeep } from 'lodash-es';
import { Subject } from 'rxjs';
import { Auth } from 'app/models/auth';
// import { HelpersService } from './helpers.service';
import {  
    LOGIN_URL,
    RESET_PASSWORD_URL,
    RESET_PASSWORD_REQUEST_URL
  } from '../../../@fuse/models/url';

@Injectable()
export class AuthService
{
  getUserId // alert(JSON.stringify(response.entity));
    (): any {
    throw new Error('Method not implemented.');
  }
  updateProfile(value: any) {
    throw new Error('Method not implemented.');
  }
    authChange: Subject<Auth> = new Subject<Auth>();    
    private auth: Auth;
    private redirectUrl: string;
    expiredDate: any;
    externalAuth = false;
    private _authenticated: boolean = false;
    private readonly _secret: any;
    remoteURL:any;
    redirectURL:any;
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private cookieService: CookieService,
        // private helpersService: HelpersService
    )
    {
        this._secret = 'P4U_H3ALTHCAR3';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    setAuth(auth: Auth) {
        this.expiredDate = new Date();
        this.expiredDate.setMinutes(this.expiredDate.getMinutes() + 30);
        this.auth = auth;
        this.cookieService.set('auth', JSON.stringify(auth), this.expiredDate);
        this.authChange.next(this.auth);
    }
    
    setCookie(variable, value) {
        this.expiredDate = new Date();
        this.expiredDate.setMinutes(this.expiredDate.getMinutes() + 30);
        this.cookieService.set(variable, value, this.expiredDate, '/');
    }
      getCookie(variable) {
        return this.cookieService.get(variable);
      }
      deleteCookie(variable) {
        this.cookieService.delete(variable, '/');
      }
    
      setInMemory(auth: Auth) {
        this.auth = auth;
        this.externalAuth = true;
      }
    
      setRedirectUrl(redirectUrl: string) {
        this.redirectUrl = redirectUrl;
      }
    
      getRedirectUrl() {
        return this.redirectUrl;
      }
    
      getAuth(): Auth {
        if (this.auth) {
          return this.auth;
        }
        let authDetails = this.cookieService.get('auth');
        let auth: Auth = null;
        if (!authDetails) {
          auth = Auth.createGuest();
        } else {
          authDetails = JSON.parse(authDetails);
          auth = Auth.createFromHash(authDetails);
        }
        return auth;
      }

    /**
     * Forgot password
     *
     * @param username
     */
    forgotPassword(credentials: any): Observable<any>
    {
        return this._httpClient.post(RESET_PASSWORD_REQUEST_URL,credentials).pipe(
            switchMap((response: any) => {  
                // Store the access token in the local storage
               if(response.errorType!=undefined){
                return of(response);
               }
                if(response.status){                   
                   return of(response);
                }

                // Return a new observable with the response
               
            })
        );
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(credentials: any): Observable<any>
    {
        let id_user=this.cookieService.get('reset_id_user');
        credentials.id_user=id_user;
        return this._httpClient.post(RESET_PASSWORD_URL, credentials).pipe(
            switchMap((response: any) => {
                this.cookieService.delete('reset_id_user');
                // Store the access token in the local storage
               if(response.errorType!=undefined){
                return of(response);
               }
                if(response.status){                   
                   return of(response);
                }

                // Return a new observable with the response
               
            })
        );
    }

    /**
     * Sign in
     *
     * @param credentials
     */




    
    signIn(credentials: { username: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }
        return this._httpClient.post(LOGIN_URL, credentials).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
               if(response.errorType!=undefined){
                this.cookieService.set('reset_id_user',response.message.id_user);
                return of(response);
               }
                if(response.status){
                    // alert(JSON.stringify(response.entity));
                    const auth=Auth.createFromHash(response.entity);
                    // console.log(response.entity.UserName)
                    this.setAuth(auth);
                    if(response.entity.UserID){  
                        this.accessToken = response.entity.token;              
                        // Set the authenticated flag to true
                        this._authenticated = true;
                        // Store the user on the user service
                        this._userService.update(response.entity.UserName);
                        this.redirectURL = '/pages/profile';
                        this.setRedirectUrl(this.redirectURL);
                        return [
                            200,
                            {
                                user       : cloneDeep(this._userService.user),
                                accessToken: this._generateJWTToken(),
                                tokenType  : 'bearer'
                            }
                        ];
                    }
                   // return of(response);
                }

                // Return a new observable with the response
               
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {       
        // Renew token
        return this._httpClient.post('api/auth/refresh-access-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {
                const accessToken = this.accessToken;

                    // Verify the token
                    if ( this._verifyJWTToken(accessToken) )
                    {
                        return [
                            200,
                            {
                                user       : cloneDeep(this._userService.user),
                                accessToken: this._generateJWTToken(),
                                tokenType  : 'bearer'
                            }
                        ];
                    }

                    // Invalid token
                    return [
                        401,
                        {
                            error: 'Invalid token'
                        }
                    ];

                
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;
        this.cookieService.delete('auth', '/');
        
        // Trigger a refresh or navigate to a different route to apply changes after 5 seconds
        setTimeout(() => {
            window.location.reload(); // This will reload the browser
        }, 5000); // 5000 milliseconds = 5 seconds

        const keys = Object.keys({ ...localStorage });
      
        this.auth = null;
        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
      
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }


     /**
     * Verify the given token
     *
     * @param token
     * @private
     */
      private _verifyJWTToken(token: string): boolean
      {
          // Split the token into parts
          const parts = token.split('.');
          const header = parts[0];
          const payload = parts[1];
          const signature = parts[2];
  
          // Re-sign and encode the header and payload using the secret
          const signatureCheck = this._base64url(HmacSHA256(header + '.' + payload, this._secret));
  
          // Verify that the resulting signature is valid
          return (signature === signatureCheck);
      }

 /**
     * Return base64 encoded version of the given string
     *
     * @param source
     * @private
     */
  private _base64url(source: any): string
  {
      // Encode in classical base64
      let encodedSource = Base64.stringify(source);

      // Remove padding equal characters
      encodedSource = encodedSource.replace(/=+$/, '');

      // Replace characters according to base64url specifications
      encodedSource = encodedSource.replace(/\+/g, '-');
      encodedSource = encodedSource.replace(/\//g, '_');

      // Return the base64 encoded string
      return encodedSource;
  }

  /**
   * Generates a JWT token using CryptoJS library.
   *
   * This generator is for mocking purposes only and it is NOT
   * safe to use it in production frontend applications!
   *
   * @private
   */
  private _generateJWTToken(): string
  {
      // Define token header
      const header = {
          alg: 'HS256',
          typ: 'JWT'
      };

      // Calculate the issued at and expiration dates
      const date = new Date();
      const iat = Math.floor(date.getTime() / 1000);
      const exp = Math.floor((date.setDate(date.getDate() + 7)) / 1000);

      // Define token payload
      const payload = {
          iat: iat,
          iss: 'P4U_H3ALTHCAR3',
          exp: exp
      };

      // Stringify and encode the header
      const stringifiedHeader = Utf8.parse(JSON.stringify(header));
      const encodedHeader = this._base64url(stringifiedHeader);

      // Stringify and encode the payload
      const stringifiedPayload = Utf8.parse(JSON.stringify(payload));
      const encodedPayload = this._base64url(stringifiedPayload);

      // Sign the encoded header and mock-api
      let signature: any = encodedHeader + '.' + encodedPayload;
      signature = HmacSHA256(signature, this._secret);
      signature = this._base64url(signature);

      // Build and return the token
      return encodedHeader + '.' + encodedPayload + '.' + signature;
  }

}
