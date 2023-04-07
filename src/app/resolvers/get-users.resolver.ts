import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { ApiService } from '../services/api.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { ResponseStatus } from '../models/status.model';
import { AppService } from '../services/app.service';

@Injectable({
    providedIn: 'root'
})
export class GetUsersResolver implements Resolve<User[]|ResponseStatus> {

    constructor(
      private appService: AppService,
      private apiService: ApiService
      ) {}
  
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]|ResponseStatus> {
      this.appService.startActivity()
      return this.apiService.getUsers().pipe(
        finalize(() => {
          this.appService.stopActivity();
        })
      )
    }
  }