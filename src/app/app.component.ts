import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { fadeInOutAnimation, routerFadeInOutAnimation } from './utils/animations.utils';
import { RouterOutlet } from '@angular/router';

import { AuthService } from './services/auth.service';
import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOutAnimation, routerFadeInOutAnimation]
})
export class AppComponent implements OnInit {
  title = 'creepers';

  isAuth: boolean;

  constructor(
    private authService: AuthService, 
    public appService: AppService) {  
      this.authService.getAccountObservable().subscribe((account: Account) => {
        this._checkAccount(account);
      })
    
  }

  ngOnInit() {
    this._checkAccount(this.authService.getAccount());
  }

  doRouterFadeInOutAnimation(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }  

  _checkAccount(account: Account) {
    if(!account || !account.token)  {
      this.isAuth = false;
      return;
    }

    this.isAuth = true;
  }
}
