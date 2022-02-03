import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-status-overlay',
  templateUrl: './status-overlay.component.html',
  styleUrls: ['./status-overlay.component.scss'],
})
export class StatusOverlayComponent {
  public offer: any;

  constructor(private modalCtrl: ModalController, private restService: RestService,
    private utilityService: UtilityService, public navParams: NavParams) { }

  ionViewWillEnter() {
    this.offer = this.navParams.get('offer');
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async refreshStatus(offerId) {
    const self = this;
    try {
      self.utilityService.presentLoading();
      (await self.restService.getTakenOffer(offerId)).subscribe(response => {
        self.utilityService.presentToast(response.message);
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
  async confirmPayment() {
    const self = this;
    try {
      self.utilityService.presentLoading();
      (await self.restService.updateStatus(this.offer.id)).subscribe(response => {
        if (!response.error) {
          self.offer.taker_confirmed = 1;
        }
        self.utilityService.presentToast(response.message);
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
}
