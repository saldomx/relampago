import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DecodeInvoicePage } from './decode-invoice.page';

const routes: Routes = [
  {
    path: '',
    component: DecodeInvoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecodeInvoicePageRoutingModule {}
