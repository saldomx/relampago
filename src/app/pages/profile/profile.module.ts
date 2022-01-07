import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { NgMaretialModule } from 'src/app/ng-maretial/ng-maretial.module';
import { HeaderModule } from 'src/app/component/header/header.module';
import { FooterModule } from 'src/app/component/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    NgMaretialModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule { }
