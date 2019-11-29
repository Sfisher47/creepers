import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseStatus } from '../models/status.model';

@Injectable({
    providedIn: 'root'
})
export class GetContactsResolver implements Resolve<Contact[]|ResponseStatus> {

    constructor(private contactService: ContactService) {}
  
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact[]|ResponseStatus> {
      return this.contactService.list()
    }
  }