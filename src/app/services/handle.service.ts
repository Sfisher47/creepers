import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpHandleService {

    constructor(private router: Router) {
    }

    public handleError(error: Error | HttpErrorResponse) {

      if (error instanceof HttpErrorResponse) {

        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
          // this.toast.present('Une erreur est survenue');
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
          // this.toast.present('Le serveur n\'a pas pu répondre correctement');
        }

        console.log(error);
        //this.manageError(this.router, error);

      } else if (error instanceof Error) {

        if (error.name && error.name === 'TimeoutError') {
          // A request timeout. Handle it accordingly.
          console.error('An error occurred:', error.message);
          //this.router.navigate(['/exception/408'], {replaceUrl: true});
          // this.toast.present('Le serveur n\'a pas pu répondre correctement');
        }

      }

      // return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
    }

    manageError(router: Router, errorResponse: HttpErrorResponse) {
      switch (errorResponse.status) {
        case 401: {
          router.navigate(['/exception/401'], {replaceUrl: true});
          break;
        }
        case 403: {
          router.navigate(['/exception/403'], {replaceUrl: true});
          break;
        }
        case 404: {
          router.navigate(['/exception/404'], {replaceUrl: true});
          break;
        }
        case 500: {
          router.navigate(['/exception/500'], {replaceUrl: true});
          break;
        }
        default: {
          console.error(errorResponse);
          router.navigate(['/exception/0'], {replaceUrl: true});
          break;
        }
      }
    }

}
