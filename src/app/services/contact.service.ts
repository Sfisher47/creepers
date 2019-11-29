import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UrlService } from './url.service';
import { HttpHandleService } from './handle.service';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { AuthService } from './auth.service';
import { ResponseStatus } from '../models/status.model';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(
        private http: HttpClient,
        private urlService: UrlService,
        private authService: AuthService,
        private httpHandleService:HttpHandleService){

    }

    list(limit: number = null, offset: number = null): Observable<Contact[]|ResponseStatus> {
        const url = this.urlService.apiRoute('/contacts');
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization':  `Bearer ${this.authService.getAccount().token}`
            }),
            /*params: {limit: ""+limit, offset: ""+offset}*/
        };
        return this.http.get<Contact[]|ResponseStatus>(url, httpOptions).pipe(
            catchError(this.httpHandleService.handleError.bind(this.httpHandleService))
        );
    }

    read(id: number): Observable<Contact> {
        const url = this.urlService.apiRoute('/contacts/'+id);
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization':  `Bearer ${this.authService.getAccount().token}`
            })
        };
        return this.http.get<Contact>(url, httpOptions).pipe(
            catchError(this.httpHandleService.handleError.bind(this.httpHandleService))
        );
    }

    create(data: Contact): Observable<ResponseStatus|any> {
        const url = this.urlService.apiRoute('/contacts');
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization':  `Bearer ${this.authService.getAccount().token}`
            })
        };
        return this.http.post<ResponseStatus|any>(url, data, httpOptions).pipe(
            catchError(this.httpHandleService.handleError.bind(this.httpHandleService))
        );
    }

    update(id: number, data: Contact): Observable<ResponseStatus|any> {
        const url = this.urlService.apiRoute('/contacts/'+id);
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization':  `Bearer ${this.authService.getAccount().token}`
            })
        };
        return this.http.put<ResponseStatus|any>(url, data, httpOptions).pipe(
            catchError(this.httpHandleService.handleError.bind(this.httpHandleService))
        );
    }


    delete(id: number): Observable<ResponseStatus|any> {
        const url = this.urlService.apiRoute('/contacts/'+id);
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization':  `Bearer ${this.authService.getAccount().token}`
            })
        };
        return this.http.delete<ResponseStatus|any>(url, httpOptions).pipe(
            catchError(this.httpHandleService.handleError.bind(this.httpHandleService))
        );
    }
}