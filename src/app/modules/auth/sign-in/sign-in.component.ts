import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { P4UAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { Auth } from 'app/models/auth';
import { IdentityService } from 'app/services/identity.service';


@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: P4UAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    auth:Auth;
     UserID:any;
     UserRole:any;
     redirectURL:any;
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
       private _IdentityService: IdentityService
    )
    {
        this.auth=this._IdentityService.getAuth();
        this.UserID=this.auth.UserID;
        this.UserRole=this.auth.roles[0];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            Username     : ['', [Validators.required]],
            password  : ['', Validators.required],
            rememberMe: ['']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void
    {
        // Return if the form is invalid
        if ( this.signInForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
      

        this._authService.signIn(this.signInForm.value).subscribe(
            (response: any) => {
                if (response.errorType=="api") {
                    if(response.message.status=="ResetPassword"){
                         this._router.navigateByUrl('/reset-password');
                    }
                    else{
                        this.signInForm.enable();

                        // Reset the form
                        this.signInNgForm.resetForm();
    
                        // Set the alert
                        this.alert = {
                            type   : 'error',
                            message: 'Wrong Username or password'
                        };
    
                        // Show the alert
                        this.showAlert = true;  
                    }
                
                } else {
                   
                   
                    this.redirectURL=this._authService.getRedirectUrl();
                //    alert(this.redirectURL)
                    // Navigate to the redirect url
                    this._router.navigateByUrl(this.redirectURL);
                }
            

        }
              
          );
        
       
    }

   
}
