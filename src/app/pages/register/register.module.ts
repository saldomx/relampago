import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { HeaderModule } from 'src/app/component/header/header.module';
import { NgMaretialModule } from 'src/app/ng-maretial/ng-maretial.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    HeaderModule,
    NgMaretialModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
