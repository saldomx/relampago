import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffersPageRoutingModule } from './offers-routing.module';

import { OffersPage } from './offers.page';
import { FooterModule } from 'src/app/component/footer/footer.module';
import { HeaderModule } from 'src/app/component/header/header.module';
import { NgMaretialModule } from 'src/app/ng-maretial/ng-maretial.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgMaretialModule,
    OffersPageRoutingModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [OffersPage]
})
export class OffersPageModule { }
