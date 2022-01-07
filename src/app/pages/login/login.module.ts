import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { HeaderModule } from 'src/app/component/header/header.module';
import { NgMaretialModule } from 'src/app/ng-maretial/ng-maretial.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HeaderModule,
    NgMaretialModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
