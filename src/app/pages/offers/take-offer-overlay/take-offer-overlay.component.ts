import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-take-offer-overlay',
  templateUrl: './take-offer-overlay.component.html',
  styleUrls: ['./take-offer-overlay.component.scss'],
})
export class TakeOfferOverlayComponent {
  public offer = {};

  constructor(private modalCtrl: ModalController, private utilityService: UtilityService,
    private restService: RestService, public navParams: NavParams) { }

  ionViewWillEnter() {
    this.offer = this.navParams.get('offer');
  }

  clearInput(form: NgForm) {
    form.reset();
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async takeOffer(form: NgForm) {
    const self = this;
    const offer: any = self.offer;
    offer.takenAmount = form.value.amount;
    const payload = {
      url: `${environment.HOST}/take/offer`,
      body: offer
    };
    try {
      self.utilityService.presentLoading();
      const response = await self.restService.post(payload);
      self.utilityService.presentToast(response.message || 'Offer created successfully');
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
}
