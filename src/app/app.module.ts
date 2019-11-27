import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {CookieService} from 'ngx-cookie-service';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SnotifyModule,

    TooltipModule.forRoot(),
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    CookieService,
    SnotifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
