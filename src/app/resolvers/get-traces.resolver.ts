import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Trace } from '../models/trace.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseStatus } from '../models/status.model';

@Injectable({
    providedIn: 'root'
})
export class GetTracesResolver implements Resolve<Trace[]|ResponseStatus> {

    constructor(private apiService: ApiService) {}
  
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Trace[]|ResponseStatus> {
      return this.apiService.getTraces()
    }
  }