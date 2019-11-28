import { Injectable } from "@angular/core";

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Subject, Observable, throwError } from 'rxjs';
import { catchError, map, retry, timeout, ignoreElements } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';

import { HttpHandleService } from './handle.service';
import { UrlService } from './url.service';

import { Account } from '../models/account.model';
import { ResponseStatus } from '../models/status.model';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public isAuth: boolean;
    public checkingAvailable: boolean;
    private account: Account;

    private subjectAccount: Subject<Account> = new Subject<Account>();

    constructor(
        private http: HttpClient,
        private urlService: UrlService,
        private httpHandleService:HttpHandleService,
        private cookieService:CookieService) {
            
            this.subjectAccount.subscribe((account: Account) => {
                if(!account || !account.token)  {
                    this.cookieService.deleteAll();
                    return;
                }

                this.cookieService.set('account',JSON.stringify(account));
            });
        
    }

    getAccountObservable() {
        return this.subjectAccount;
    }

    flushAccount(account: Account) {
        this.subjectAccount.next(account);
    }

    getAccount(): Account {
        if(!this.cookieService.check('account')) {
            return null;
        }

        const account: Account = JSON.parse(this.cookieService.get('account'));
        if(!account || !account.token) {
            return null;
        }

        return account;
    }

    onLogin(data: any): Observable<Account> {
        const endpoint = this.urlService.apiRoute('/users/login');
        
        return this.http.post<Account>(endpoint, data)
        .pipe(
            map((account: Account) =>{
                if(account && account.token) {
                    this.flushAccount(account);
                }
                else{
                    this.flushAccount(null);
                }

                return account;
            }),
            catchError(this.httpHandleService.handleError.bind(this.httpHandleService))
        );
    }

    onLogout() {
        this.flushAccount(null);
    }

    onRegister(data: any): Observable<ResponseStatus> {
        const endpoint = this.urlService.apiRoute('/users/register');
        
        return this.http.post<ResponseStatus>(endpoint, data)
        .pipe(
            catchError(this.httpHandleService.handleError.bind(this.httpHandleService))
        );
    }

    checkPhoneAvailable(telephone): Observable<any> {
        const endpoint = this.urlService.apiRoute('/users/phone/available');
        
        return this.http.post<any>(endpoint, {telephone})
        .pipe(
            catchError(this.httpHandleService.handleError.bind(this.httpHandleService))
        );

    }

}