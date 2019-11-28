import { AuthService } from '../services/auth.service';
import { AsyncValidatorFn, AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

/** A Validator Function check password match */
export function checkPasswordMatchValidator(controlName): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const form: FormGroup = control.parent as FormGroup;
        if(!form) return null;

        const target: AbstractControl = form.controls[controlName] as AbstractControl;
        return control.value !== target.value ? {'check_password_match' : true} : null 
    };
}

/** A Async Validator Function check telephone */
export function checkPhoneAvailableValidator(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{[key: string]: any} | null> => {
        authService.checkingAvailable = true;
        return authService.checkPhoneAvailable(control.value).pipe(
            map( res => { 
                authService.checkingAvailable = false;
                return res.count ? {'check_phone_available' : true} : null 
            }),            
            finalize(() => {
                authService.checkingAvailable = false;
            })
        );
    };
}