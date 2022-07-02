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
    self.utilityService.presentLoading();
    await (await self.restService.sendPayment(payload)).subscribe({
      next: () => { },
      error: (err) => {
        console.log('Error', err);
        self.utilityService.presentToast(
          err.error.error || JSON.stringify(err.error)
        );
        self.utilityService.dismissLoading();
      },
      complete: () => {
        self.utilityService.dismissLoading();
        self.showSuccess = true;
        self.showDetails = true;
      }
    });
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }
}
