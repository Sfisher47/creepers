import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const account = this.authService.getAccount();
        const isAdmin: boolean = account.profil == 1 ? true : false;
        const isAuth: boolean = (account && account.token) ? true : false;
        
        if(!isAuth) {
            this.router.navigate(['/signin']);
            return;
        }

        if(!isAdmin) {
            this.router.navigate(['/forbidden']);
            return;
        }

        return isAuth && isAdmin;
    }
}