import { Component, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ContactFormComponent } from './form/contact-form.component';
import { Contact } from 'src/app/models/contact.model';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { ResponseStatus } from 'src/app/models/status.model';
import { ToastService } from 'src/app/services/toast.service';

import { showAnimation, listAnimation } from 'src/app/utils/animations.utils';



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  animations: [showAnimation, listAnimation]
})
export class ContactComponent implements OnInit{

  bsModalRef: BsModalRef;
  dialogueRef: BsModalRef;

  contactId: number;
  contacts: Contact[];
  currentContact: Contact;
  isWorking: boolean;
  isRefresh: boolean;

  displayState: string = 'close';

  constructor(
    private route: ActivatedRoute,
    private toastService: ToastService,
    private contactService: ContactService,
    private modalService: BsModalService
    ){    
  }  
   
  ngOnInit() {
    this.contacts = this.route.snapshot.data['contacts'];
  }

  refresh() {
    this.isRefresh = true;
    this.contactService.list().subscribe(
      (res) => {
        if(res instanceof ResponseStatus && res.code) return;
        this.contacts = res as Contact[]; 
      },
      () => {},
      () => {
        this.isRefresh = false;
      }
    )
  }

  onDisplay(contact: Contact) {
    this.displayState = 'close';
    setTimeout(() => this.displayState = 'open', 200);

    this.currentContact = contact;
  }

  onDelete(id: number, template: TemplateRef<any>) {
    this.contactId = id;
    this.dialogueRef = this.modalService.show(template);
  }

  confirm() {
    if(!this.contactId) return;

    this.isWorking = true;
    this.contactService.delete(this.contactId).subscribe(
      (res) => {
        this.contactId = undefined;
        this.dialogueRef.hide();
        this.toastService.success('Operation ok !');
      },
      null,
      () => {
        this.refresh();
      }
    )
  }

  cancel() {
    this.dialogueRef.hide();
  }

  openModal() {    
    this.bsModalRef = this.modalService.show(ContactFormComponent);
    this.modalService.onHidden.subscribe((reason: string) => {
      if(this.bsModalRef.content.refreshing) {
        this.refresh();
      }
    })
  }
}
