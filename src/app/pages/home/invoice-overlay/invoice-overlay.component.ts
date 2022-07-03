import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ZBar } from '@ionic-native/zbar/ngx';

@Component({
  selector: 'app-overlay',
  templateUrl: './invoice-overlay.component.html',
  styleUrls: ['./invoice-overlay.component.scss'],
})
export class InvoiceOverlayComponent implements OnInit {
  public invoiceResult: any = {};
  public showDetails: any = false;
  public showSuccess: any = false;
  public optionZbar: any;
  public scannedOutput: any;
  public paymentRequest = '';
  constructor(private utilityService: UtilityService,
    private restService: RestService,
    private modalCtrl: ModalController,
    private zbarPlugin: ZBar) {
    this.optionZbar = {
      flash: 'off',
      drawSight: false
    };
  }

  ngOnInit() { }

  clearRequest() {
    this.paymentRequest = '';
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
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  barcodeScanner() {
    const self = this;
    self.zbarPlugin.scan(this.optionZbar)
      .then(response => {
        console.log(response);
        self.paymentRequest = response;
        self.decodeRequest();
      })
      .catch(error => {
        alert(error);
      });
  }
}
