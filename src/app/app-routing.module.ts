import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './pages/signin/signin.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { ContactComponent } from './pages/contacts/contacts.component';
import { InputFileComponent } from './pages/contacts/input-file/input-file.component';
import { ContactFormComponent } from './pages/contacts/form/contact-form.component';
import { FavoriteComponent } from './pages/contacts/favorite/favorite.component';
import { ContactSingleComponent } from './pages/contacts/single/contact-single.component';
import { TracesComponent } from './pages/traces/traces.component';

import {ApiService} from './services/api.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

import { GetContactsResolver } from './resolvers/get-contacts.resolver';
import { GetTracesResolver } from './resolvers/get-traces.resolver';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';


const routes: Routes = [
  {path: 'signin', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: 'contacts', 
    component: ContactComponent,
    resolve: {contacts: GetContactsResolver},
    canActivate: [AuthGuard],
  },
  {
    path: 'traces', 
    component: TracesComponent,
    resolve: {traces: GetTracesResolver},
    canActivate: [AuthGuard, AdminGuard],
  },

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
    FavoriteComponent,
    InputFileComponent,
    ContactFormComponent,
    ContactSingleComponent,

    SignInComponent,
    SignUpComponent,
    ContactComponent,
    TracesComponent,
    ForbiddenComponent

  ],
  

})
export class AppRoutingModule { }
