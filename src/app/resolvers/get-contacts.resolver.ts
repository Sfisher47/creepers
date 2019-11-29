import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { ResponseStatus } from '../models/status.model';
import { AppService } from '../services/app.service';

@Injectable({
    providedIn: 'root'
})
export class GetContactsResolver implements Resolve<Contact[]|ResponseStatus> {

    constructor(
      private appService: AppService,
      private contactService: ContactService
      ) {}
  
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact[]|ResponseStatus> {
      this.appService.startActivity()
      return this.contactService.list().pipe(
        finalize(() => {
          this.appService.stopActivity();
        })
      )
    }
  }