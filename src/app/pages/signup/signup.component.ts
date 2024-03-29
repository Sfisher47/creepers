import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { checkPhoneAvailableValidator, checkPasswordMatchValidator } from 'src/app/utils/validator.utils';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit{
  
  form: FormGroup;
  isWorking: boolean;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private toastService: ToastService,
    private router:Router
  ){}

    ngOnInit() {
      this.initForm();
      document.querySelector('body').setAttribute('class', 'bg-blue');
    }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*')], checkPhoneAvailableValidator(this.authService)],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordMatch: ['', [Validators.required, Validators.minLength(6), checkPasswordMatchValidator('password')]]
    });
  }

  isControlInvalid(controlName: string) {
    return this.form.controls[controlName].touched && this.form.controls[controlName].invalid;
  }

  onSubmit() {
    
    const data = {
      name: this.form.controls.name.value,
      email: this.form.controls.email.value,
      telephone: this.form.controls.telephone.value, 
      password : this.form.controls.password.value,
    }

    this.isWorking = true;
    this.authService.onRegister(data)
    .pipe(finalize(() => {
      this.isWorking = false;
    }))
    .subscribe(
      (response) => {
        if( response.code ) {
          this.toastService.error('Registring fail !!!');
          return;
        }

        this.toastService.success('Registring success !');
        this.router.navigate(['/signin']);
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
