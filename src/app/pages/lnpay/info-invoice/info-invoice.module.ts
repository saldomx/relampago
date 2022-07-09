import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoInvoicePageRoutingModule } from './info-invoice-routing.module';

import { InfoInvoicePage } from './info-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoInvoicePageRoutingModule
  ],
  declarations: [InfoInvoicePage]
})
export class InfoInvoicePageModule {}
