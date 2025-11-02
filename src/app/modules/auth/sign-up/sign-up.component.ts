import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { P4UAlertType } from '@fuse/components/alert';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'app/core/auth/auth.service';
import { SessionService } from 'app/services/session.service';
import { PhoneNumberUtil } from 'google-libphonenumber';
import worldCountries from 'world-countries';
import { parsePhoneNumberFromString } from 'google-libphonenumber';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: P4UAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;
    formData: any;
    passwordStrength: number = 0;
    passwordStrengthText: string = '';

    private phoneUtil = PhoneNumberUtil.getInstance();

    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        public _sessionService: SessionService,
        private toastService: HotToastService,
        private _changeDetectorRef: ChangeDetectorRef
    ) { }
    countries: any[] = [];

    ngOnInit(): void {
        this.loadCountries();
        this.signUpForm = this._formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            CountryCode: ['', Validators.required],
            ContactNumber: ['', [Validators.required, this.phoneNumberValidator.bind(this)]],
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                this.passwordStrengthValidator()
            ]],

            passwordConfirm: ['', Validators.required],
            agreements: [false, Validators.requiredTrue]
        }, {
            validator: this.passwordMatchValidator
        });
        this.signUpForm.get('password').valueChanges.subscribe(password => {
            this.checkPasswordStrength(password);
        });
    }

    signUp(): void {
        if (this.signUpForm.invalid) {
            return;
        }

        this.signUpForm.disable();
        this.showAlert = false;
        this.formData = this.signUpForm.getRawValue();

        this._sessionService.signup(this.formData).subscribe(async (response: any) => {
            if (response.message == "Query Successful") {
                this._router.navigateByUrl('/confirmation-required');
                this._changeDetectorRef.markForCheck();
            } else {
                this.alert = {
                    type: 'error',
                    message: 'Something went wrong, please try again.'
                };
                this.showAlert = true;
            }
        });
    }
    private phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
        const phoneNumber = control.value;
    
        // Check if the value is empty
        if (!phoneNumber) {
            return { invalidPhone: true };
        }
    
        // Regular expression to check if the phone number contains only digits
        const isNumber = /^\d+$/.test(phoneNumber);
    
        if (!isNumber) {
            return { invalidPhone: true };
        }
    
        return null; // Valid input
    }
    
    private loadCountries(): void {
        this.countries = worldCountries
            .map(country => ({
                name: country.name.common,
                code: country.cca2,
                dialCode: country.idd.root + (country.idd.suffixes?.length ? country.idd.suffixes[0] : '')
            }))
            .filter(country => country.dialCode)
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password');
        const confirmPassword = control.get('passwordConfirm');

        if (password && confirmPassword && password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        }

        return null;
    }

    verifyUserName(event) {
        this._sessionService.verifyUserName(event.target.value).subscribe(async (response: any) => {
            if (response.entity.count > 0) {
                this.toastService.error("Username Taken. <br>Please choose a different UserName", {
                    position: 'top-center'
                });
                event.target.value = '';
                event.target.focus();
                this._changeDetectorRef.markForCheck();
            }
        });
    }

    verifyEmail(event) {
        this._sessionService.verifyUserName(event.target.value).subscribe(async (response: any) => {
            if (response.entity.count > 0) {
                this.toastService.error("Email Already Registered  <br>Sign in or use a different email", {
                    position: 'top-center'
                });
                event.target.value = '';
                event.target.focus();
                this._changeDetectorRef.markForCheck();
            }
        });
    }

    private passwordStrengthValidator() {
        return (control: AbstractControl): ValidationErrors | null => {
            const password = control.value;
            if (!password) {
                return null;
            }

            const strength = this.calculatePasswordStrength(password);
            return strength < 2 ? { weakPassword: true } : null;
        };
    }

    private calculatePasswordStrength(password: string): number {
        let strength = 0;

        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

        return strength;
    }

    private checkPasswordStrength(password: string): void {
        this.passwordStrength = this.calculatePasswordStrength(password);

        switch (this.passwordStrength) {
            case 0:
            case 1:
                this.passwordStrengthText = 'Weak';
                break;
            case 2:
            case 3:
                this.passwordStrengthText = 'Medium';
                break;
            case 4:
            case 5:
                this.passwordStrengthText = 'Strong';
                break;
            default:
                this.passwordStrengthText = '';
        }

        this._changeDetectorRef.markForCheck();
    }

    private validatePhoneNumber(control: AbstractControl): ValidationErrors | null {
        const countryCode = this.signUpForm?.get('countryCode')?.value;
        const phoneNumber = control.value;

        if (!countryCode || !phoneNumber) {
            return { invalidPhoneNumber: true };
        }

        try {
            const parsedPhone = this.phoneUtil.parse(phoneNumber, countryCode);
            const isValid = this.phoneUtil.isValidNumber(parsedPhone);

            return isValid ? null : { invalidPhoneNumber: true };
        } catch (error) {
            return { invalidPhoneNumber: true };
        }
    }
}
