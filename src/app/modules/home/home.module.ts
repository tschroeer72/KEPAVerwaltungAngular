import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LoginComponent } from '../layout/login/login.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LoginComponent
  ],
  exports: [LoginComponent]
})
export class HomeModule { }
