import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import {CookieService} from 'ngx-cookie-service';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import { AppCommonModule } from './app-common.module';
import { ContactFormComponent } from './pages/contacts/form/contact-form.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppCommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SnotifyModule,

    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    CookieService,
    SnotifyService,
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ContactFormComponent,
  ]
})
export class AppModule { }
