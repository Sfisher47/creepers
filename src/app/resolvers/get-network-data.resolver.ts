import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Trace } from '../models/trace.model';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { ResponseStatus } from '../models/status.model';
import { AppService } from '../services/app.service';

@Injectable({
    providedIn: 'root'
})
export class GetNetworkDataResolver implements Resolve<any[]|ResponseStatus> {

    constructor(
      private appService: AppService,
      private apiService: ApiService) {}
  
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]|ResponseStatus> {
      this.appService.startActivity()
      return this.apiService.getNetworkData().pipe(
        finalize(() => {
          this.appService.stopActivity();
        })
      )
    }
}