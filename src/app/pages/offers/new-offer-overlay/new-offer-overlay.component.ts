import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-offer-overlay',
  templateUrl: './new-offer-overlay.component.html',
  styleUrls: ['./new-offer-overlay.component.scss'],
})
export class NewOfferOverlayComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private utilityService: UtilityService,
    private restService: RestService) { }

  ngOnInit() { }

  clearInput(form: NgForm) {
    form.reset();
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async createOffer(form: NgForm) {
    const self = this;
    const payload = {
      url: `${environment.HOST}/offer`,
      body: form.value
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
