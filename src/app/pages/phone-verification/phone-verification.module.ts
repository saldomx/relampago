import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneVerificationPageRoutingModule } from './phone-verification-routing.module';

import { PhoneVerificationPage } from './phone-verification.page';
import { HeaderModule } from 'src/app/component/header/header.module';
import { NgMaretialModule } from 'src/app/ng-maretial/ng-maretial.module';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhoneVerificationPageRoutingModule,
    HeaderModule,
    NgMaretialModule,
    NgOtpInputModule
  ],
  declarations: [PhoneVerificationPage]
})
export class PhoneVerificationPageModule {}
