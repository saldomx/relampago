import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';
import { ZBarOptions, ZBar } from '@ionic-native/zbar/ngx';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
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
    const payload = {
      url: `${environment.HOST}/lnp/decode`,
      body: {
        paymentRequest: self.paymentRequest
      }
    };
    try {
      self.utilityService.presentLoading();
      const response = await self.restService.post(payload);
      self.invoiceResult = response;
      self.showDetails = true;
      setTimeout(() => {
        self.utilityService.dismissLoading();
      });
    } catch (err) {
      self.utilityService.presentToast(
        err.error.error || JSON.stringify(err.error)
      );
      self.utilityService.dismissLoading();
    }
  }
  async payInvoice() {
    const self = this;
    const payload = {
      url: `${environment.HOST}/lnp/pay`,
      body: {
        paymentRequest: self.paymentRequest,
        usdAmount: self.invoiceResult.usdAmount
      }
    };
    try {
      self.utilityService.presentLoading();
      const response = await self.restService.post(payload);
      self.showSuccess = true;
      self.showDetails = true;
      setTimeout(() => {
        self.utilityService.dismissLoading();
      });
    } catch (err) {
      self.utilityService.presentToast(
        err.error.error || JSON.stringify(err.error)
      );
      self.utilityService.dismissLoading();
    }
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  barcodeScanner() {
    const self = this;
    self.zbarPlugin.scan(this.optionZbar)
      .then(respone => {
        console.log(respone);
        self.paymentRequest = respone;
        self.decodeRequest();
      })
      .catch(error => {
        alert(error);
      });
  }
}
