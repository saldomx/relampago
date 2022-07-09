import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DecodeInvoicePageRoutingModule } from './decode-invoice-routing.module';

import { DecodeInvoicePage } from './decode-invoice.page';
import { HeaderModule } from 'src/app/component/header/header.module';
import { FooterModule } from 'src/app/component/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DecodeInvoicePageRoutingModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [DecodeInvoicePage]
})
export class DecodeInvoicePageModule { }
