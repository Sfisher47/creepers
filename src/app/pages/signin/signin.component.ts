import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, Validators, FormGroup } from '@angular/forms';
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
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.initForm()
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
    this.authService.onLogin(data).subscribe(
      (account) => {
        if( this.authService.getAccount() ) {
          this.toastService.success('Login success !');
        }
        else {
          this.toastService.error('Login fail !!!');
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
