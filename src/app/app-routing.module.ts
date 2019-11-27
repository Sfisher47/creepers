import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SignInComponent } from './pages/signin/signin.component';
import { SignUpComponent } from './pages/signup/signup.compenent';

import {ApiService} from './services/api.service';
import { HeaderPublicComponent } from './pages/layout/header_public/header-public.component';


const routes: Routes = [
  {path: 'signin', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},

  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: '**', redirectTo: 'exception/404' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ApiService
  ],
  declarations: [
    HeaderPublicComponent,
    SignInComponent,
    SignUpComponent,
  ],
  

})
export class AppRoutingModule { }
