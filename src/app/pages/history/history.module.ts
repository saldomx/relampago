import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import { HeaderModule } from 'src/app/component/header/header.module';
import { FooterModule } from 'src/app/component/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [HistoryPage]
})
export class HistoryPageModule { }
