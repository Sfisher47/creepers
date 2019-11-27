import { Injectable } from '@angular/core';
import { SERVEUR_URL } from 'src/environments/environment';



@Injectable({
    providedIn: 'root'
})
export class UrlService {

    public apiBaseUrl: string = SERVEUR_URL + '/api/v1' ;

    constructor() {
    }

    apiRoute(route: string) {
        return this.apiBaseUrl + route;
    }
}
