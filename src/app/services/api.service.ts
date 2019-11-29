import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UrlService } from './url.service';
import { HttpHandleService } from './handle.service';
import { AuthService } from './auth.service';
import { Trace } from '../models/trace.model';
import { ResponseStatus } from '../models/status.model';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient,
        private urlService: UrlService,
        private authService: AuthService,
        private httpHandleService:HttpHandleService){

    }

    getTraces() {
        const url = this.urlService.apiRoute('/traces');
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization':  `Bearer ${this.authService.getAccount().token}`
            }),
        };
        return this.http.get<Trace[]|ResponseStatus>(url, httpOptions).pipe(
            catchError(this.httpHandleService.handleError.bind(this.httpHandleService))
        );
    }


    getNetworkData() {        
        const url = this.urlService.apiRoute('/network');
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization':  `Bearer ${this.authService.getAccount().token}`
            }),
        };
        return this.http.get<Trace[]|ResponseStatus>(url, httpOptions).pipe(
            catchError(this.httpHandleService.handleError.bind(this.httpHandleService))
        );
    }


    

}