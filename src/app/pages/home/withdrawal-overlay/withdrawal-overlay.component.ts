import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-withdrawal-overlay',
  templateUrl: './withdrawal-overlay.component.html',
  styleUrls: ['./withdrawal-overlay.component.scss'],
})
export class WithdrawalOverlayComponent implements OnInit {
  public showDetails: any = false;
  public showSuccess: any = false;

  constructor(private utilityService: UtilityService,
    private restService: RestService,
    private modalCtrl: ModalController) { }

  ngOnInit() { }

  clearInput(form: NgForm) {
    form.reset();
  }

  async sendPayment(form: NgForm) {
    const self = this;
    const formpPayload = form.value;
    const payload = {
      address: formpPayload.walletAddress,
      amount: formpPayload.usdAmount,
      selectpicker: 'Solana Address'
    };
    try {
      self.utilityService.presentLoading();
      const response = await (await self.restService.sendPayment(payload)).subscribe(() => {
        self.showSuccess = true;
        self.showDetails = true;
        setTimeout(() => {
          self.utilityService.dismissLoading();
        });
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
}
