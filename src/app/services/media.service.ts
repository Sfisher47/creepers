import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';

import { UrlService } from './url.service';
import { HttpHandleService } from './handle.service';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { AuthService } from './auth.service';
import { ResponseStatus } from '../models/status.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MediaService {

    constructor(
        private http: HttpClient,
        private urlService: UrlService,
        private httpHandleService:HttpHandleService){

    }

    upload(formData: FormData): Observable<ResponseStatus|any> {
        const url = this.urlService.apiRoute('/medias/upload');
        return this.http.post<ResponseStatus|any>(url, formData, {reportProgress: true, observe: 'events'}).pipe(
            map((event) => this._getEventProgress(event)),
            catchError(this.httpHandleService.handleError.bind(this.httpHandleService))
        );
    }

    delete(file: string): Observable<ResponseStatus> {
        const url = this.urlService.apiRoute('/medias/delete');
        return this.http.post<ResponseStatus>(url, {file}).pipe(
            catchError(this.httpHandleService.handleError.bind(this.httpHandleService))
        );
    }    

    private _getEventProgress(event: HttpEvent<any>) {

        switch (event.type) {

            case HttpEventType.UploadProgress:
            const progress =  Math.round(100 * event.loaded / event.total);
            return {status: 'progress', value: progress}

            case HttpEventType.Response:
            return event.body;

            default:
            return `File surprising upload event: ${event.type}.`;
        }
    }
}