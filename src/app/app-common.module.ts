import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderPublicComponent } from './pages/layout/header_public/header-public.component';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    HeaderPublicComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
  ],
  exports: [
    AppRoutingModule,
    HeaderPublicComponent,
  ],
  providers: [
  ],
})
export class AppCommonModule { }
