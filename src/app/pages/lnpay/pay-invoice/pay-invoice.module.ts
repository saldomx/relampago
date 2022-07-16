import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayInvoicePageRoutingModule } from './pay-invoice-routing.module';

import { PayInvoicePage } from './pay-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayInvoicePageRoutingModule
  ],
  declarations: [PayInvoicePage]
})
export class PayInvoicePageModule {}
