import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Form, Validators, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  isWorking: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    document.querySelector('body').setAttribute('class', 'bg-blue');
  }

  initForm() {
    this.form = this.fb.group({
      telephone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  isControlInvalid(controlName: string) {
    return this.form.controls[controlName].touched && this.form.controls[controlName].invalid;
  }

  onSubmit() {
    
    const data = {
      telephone: this.form.controls.telephone.value, 
      password : this.form.controls.password.value,
    }

    this.isWorking = true;
    this.authService.onLogin(data)
    .pipe(finalize(() => {
      this.isWorking = false;
    }))
    .subscribe(
      (account) => {
        if( account && account.token ) {
          this.toastService.success('Login success !');
          if(account.profil == 1){
            this.router.navigate(['/network'], {replaceUrl:true});
			return;
          }

          this.router.navigate(['/contacts'], {replaceUrl:true});
        }
        else {
          this.toastService.error('Login fail !!!');
        }
      },
      (err) => {
        this.toastService.error(err);
      }
    )
  }

  ngOnDestroy() {
    document.querySelector('body').setAttribute('class', '');
  }

}
