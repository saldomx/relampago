import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoInvoicePage } from './info-invoice.page';

const routes: Routes = [
  {
    path: '',
    component: InfoInvoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoInvoicePageRoutingModule {}
