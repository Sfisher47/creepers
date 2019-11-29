import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { UrlService } from './url.service';
import { HttpHandleService } from './handle.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient,
        private urlService: UrlService,
        private httpHandleService:HttpHandleService){

    }


    

}