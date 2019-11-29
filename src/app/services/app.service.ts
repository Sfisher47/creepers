import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';

import { UrlService } from './url.service';
import { HttpHandleService } from './handle.service';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    isActivity: boolean;

    constructor(
        private http: HttpClient,
        private urlService: UrlService,
        private httpHandleService:HttpHandleService){
    }

    startActivity() {
        this.isActivity = true;
    }

    stopActivity() {
        this.isActivity = false;
    }
}