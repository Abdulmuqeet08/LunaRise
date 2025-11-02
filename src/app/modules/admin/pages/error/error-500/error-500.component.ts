import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { IdentityService } from 'app/services/identity.service';
import { Auth } from 'app/models/auth';

@Component({
    selector       : 'error-500',
    templateUrl    : './error-500.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Error500Component
{
    /**
     * Constructor
     */
    auth: Auth;
    UserID: any;
    userRole:any;
    constructor(
        private _IdentityService: IdentityService,
    )
    {
        this.auth = this._IdentityService.getAuth();
        this.UserID = this.auth.UserID;
        this.userRole=this.auth.roles[0];
    }
}
