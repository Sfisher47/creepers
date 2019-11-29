import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { ToastService } from 'src/app/services/toast.service';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { Media } from 'src/app/models/media.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
    
    form: FormGroup;
    media: Media;
    isWorking: boolean;

    refreshing: boolean = false;
  
    constructor(
      private fb: FormBuilder,
      public bsModalRef: BsModalRef,
      private contactService: ContactService,
      private toastService: ToastService,
      private router:Router
    ){}
  
      ngOnInit() {
        this.initForm()
      }
  
    initForm() {
      this.form = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telephone: ['', [Validators.required, Validators.pattern('[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*')]],
        photo: [''],
      });
    }
  
    isControlInvalid(controlName: string) {
      return this.form.controls[controlName].touched && this.form.controls[controlName].invalid;
    }
  
    onSubmit() {
      let contact = {
        name: this.form.controls.name.value,
        email: this.form.controls.email.value,
        telephone: this.form.controls.telephone.value, 
        photo : this.form.controls.photo.value,
      } as Contact;
  
      this.isWorking = true;
      this.contactService.create(contact).subscribe(
        (res) => {
          if(res.code) {
            this.toastService.error('Operation fail !!!');
            return;
          }

          this.refreshing = true;
          this.toastService.success('Operation ok !');
          this.bsModalRef.hide();
        },
        (err) => {
          this.toastService.error(err);
        },
        () => {
          this.isWorking = false;
        }
      )
    }

    onUpload(filename: string) {
        if(filename) { 
          console.log(filename);
          this.form.controls.photo.setValue(filename);
        }
    }
}
