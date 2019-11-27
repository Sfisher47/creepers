import { AuthService } from '../services/auth.service';
import { AsyncValidatorFn, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/** A Validator Function check password match */
export function checkPasswordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        let target: AbstractControl = control.parent.controls['password'] as AbstractControl;
        return control.value == target.value ? {'is_password_match' : true} : null 
    };
}

/** A Async Validator Function check telephone */
export function checkPhoneAvailableValidator(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{[key: string]: any} | null> => {
        return authService.checkPhoneAvailable(control.value).pipe(
            map( res => { return !res.code ? {'is_phone_available' : true} : null } )
        );
    };
}