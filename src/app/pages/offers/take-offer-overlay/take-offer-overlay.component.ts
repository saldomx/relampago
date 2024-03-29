/* eslint-disable @angular-eslint/directive-selector */
import { Component, Directive, Input, OnInit } from '@angular/core';
import { AbstractControl, NgForm, NG_VALIDATORS, ValidationErrors, Validator, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-take-offer-overlay',
  templateUrl: './take-offer-overlay.component.html',
  styleUrls: ['./take-offer-overlay.component.scss'],
})
export class TakeOfferOverlayComponent {
  public offer: any = {};
  public validAmount = true;
  public getAmount = '0.00';

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
    if (form.value.amount > (Number(self.offer.amount) + Number(self.offer.fee))) {
      self.utilityService.presentToast('Invalid amount input, please put amount less than offer amount - fee');
      return false;
    }
    const offer: any = self.offer;
    offer.takenAmount = form.value.amount;
    await self.utilityService.presentLoading();
    (await self.restService.takeOffer(offer)).subscribe({
      next: (response) => {
        self.utilityService.presentToast(response.message);
      },
      error: async (err) => {
        await self.utilityService.dismissLoading();
        self.utilityService.presentToast(
          err.error.error || JSON.stringify(err.error)
        );
      },
      complete: async () => {
        await self.utilityService.dismissLoading();
        await this.modalCtrl.dismiss();
      }
    });
  }
  onKeydownEvent(event, form: NgForm) {
    const self = this;
    const amount = form.value.amount;
    const maxAmountCanTake = Number(self.offer.amount) - Number(self.offer.fee);

    if (amount > maxAmountCanTake) {
      self.validAmount = false;
      self.getAmount = 'Invalid amount';
    } else {
      self.getAmount = String(form.value.amount || '0.00');
      self.validAmount = true;
    }
  }

}

