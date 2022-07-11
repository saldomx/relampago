import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZBar } from '@ionic-native/zbar/ngx';
import { RestService } from 'src/app/services/rest.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-decode-invoice',
  templateUrl: './decode-invoice.page.html',
  styleUrls: ['./decode-invoice.page.scss'],
})
export class DecodeInvoicePage implements OnInit {

  public invoiceResult: any = {};
  public showDetails: any = false;
  public showSuccess: any = false;
  public optionZbar: any;
  public scannedOutput: any;
  public paymentRequest = '';
  constructor(private utilityService: UtilityService,
    private restService: RestService,
    private router: Router,
    private zbarPlugin: ZBar) {
    this.optionZbar = {
      flash: 'off',
      drawSight: false
    };
  }

  ngOnInit() { }

  clearRequest() {
    this.paymentRequest = '';
    this.showDetails = false;
  }
  async decodeRequest() {
    const self = this;
    await self.utilityService.presentLoading();
    (await self.restService.decodeInvoice(self.paymentRequest)).subscribe({
      next: (response) => {
        self.invoiceResult = response;
      },
      error: async (err) => {
        await self.utilityService.dismissLoading();
        self.utilityService.presentToast(
          err.error.error || JSON.stringify(err.error)
        );
      },
      complete: async () => {
        await self.utilityService.dismissLoading();
        self.showDetails = true;
      }
    });
  }
  async payInvoice() {
    const self = this;
    const payload = {
      paymentRequest: self.paymentRequest,
      usdAmount: self.invoiceResult.usdAmount
    };
    await self.utilityService.presentLoading();
    (await self.restService.payInvoice(payload)).subscribe({
      next: () => { },
      error: async (err) => {
        await self.utilityService.dismissLoading();
        self.utilityService.presentToast(
          err.error.error || JSON.stringify(err.error)
        );
      },
      complete: async () => {
        await self.utilityService.dismissLoading();
        self.showDetails = true;
        self.showSuccess = true;
      }
    });
  }

  barcodeScanner() {
    const self = this;
    self.zbarPlugin.scan(this.optionZbar)
      .then(response => {
        self.paymentRequest = response;
        self.decodeRequest();
      })
      .catch(error => {
        alert(error);
      });
  }
  goToHome() {
    this.router.navigate(['home']);
  }

}
