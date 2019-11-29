import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Account } from 'src/app/models/account.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-public',
  templateUrl: './header-public.component.html',
  styleUrls: ['./header-public.component.scss']
})
export class HeaderPublicComponent implements OnInit {
  
  isAuth: boolean;
  isAdmin: boolean;
  account: Account;

  constructor(private authService: AuthService, private router: Router){    
    this.authService.getAccountObservable().subscribe((account: Account) => {
      this._checkAccount(account);
    })
  }

  ngOnInit() {
    this._checkAccount(this.authService.getAccount());
  }

  _checkAccount(account: Account) {
    if(!account || !account.token)  {
      this.isAuth = false;
      this.isAdmin = false;
      this.router.navigate(['/signin'])
      return;
    }
    this.isAuth = true;
    this.account = account;
    this.isAdmin = this.account.profil == 1 ? true : false;
  }

  onLogout() {
    this.authService.onLogout()
  }

  onGoToSignin() {
    this.router.navigate(['/signin'])
  }

  onGoToSignup() {
    this.router.navigate(['/signup'])
  }
}
