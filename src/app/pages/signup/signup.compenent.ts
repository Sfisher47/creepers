import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private authService: AuthService,
    private toastService: ToastService,
  ){}

    ngOnInit() {
      this.initForm()
    }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      telephone: ['', Validators.compose([Validators.required, Validators.pattern('[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*')]), checkPhoneAvailableValidator(this.authService)],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordMatch: ['', [Validators.required, Validators.minLength(6), checkPasswordMatchValidator]]
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
    this.authService.onRegister(data).subscribe(
      (response) => {
        if( response.code ) {
          this.toastService.error('Registring fail !!!');
          return;
        }

      },
      (err) => {
        this.toastService.error(err);
      },
      () => {
        this.isWorking = false;
      }
    )
  }
}
