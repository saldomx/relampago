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

    try {
      self.utilityService.presentLoading();
      (await self.restService.takeOffer(offer)).subscribe(async (response) => {
        self.utilityService.presentToast(response.message);
        if (!response.error) {
          await this.modalCtrl.dismiss();
        }
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
  onKeydownEvent(event, form: NgForm) {
    console.log(event);
  }
}

@Directive({
  selector: '[max]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinDirective, multi: true }]
})
export class MinDirective implements Validator {

  @Input() max: number;

  validate(control: AbstractControl): { [key: string]: any } {
    return Validators.max(this.max)(control);
  }
}
