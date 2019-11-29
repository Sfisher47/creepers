import { Component, Output, EventEmitter, Input } from '@angular/core';

import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-contact-single',
  templateUrl: './contact-single.component.html',
  styleUrls: ['./contact-single.component.scss']
})
export class ContactSingleComponent {

  @Input() contact: Contact;
  isWorking: boolean;

  constructor(
    private contactService: ContactService,
  ) { }

  ngOnInit() {
  }
}
