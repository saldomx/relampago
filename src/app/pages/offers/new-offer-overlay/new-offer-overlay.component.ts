import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilityService } from 'src/app/services/utility.service';

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
    try {
      self.utilityService.presentLoading();
      (await self.restService.createOffer(form.value)).subscribe(async (response) => {
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
}
