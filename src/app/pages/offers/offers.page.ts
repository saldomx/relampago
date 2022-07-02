/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilityService } from 'src/app/services/utility.service';
import { NewOfferOverlayComponent } from './new-offer-overlay/new-offer-overlay.component';
import { TakeOfferOverlayComponent } from './take-offer-overlay/take-offer-overlay.component';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage {
  public selectedMode = 'offers';
  offersColumns: string[] = ['user', 'method', 'usdc', 'action'];
  myOffersColumns: string[] = ['method', 'total', 'status', 'action'];
  activeOffersColumns: string[] = ['method', 'amount', 'fee', 'action'];
  offers = [];
  myOffers = [];
  activeOffers = [];
  constructor(private modalCtrl: ModalController, private utilityService: UtilityService,
    private restService: RestService) { }

  ionViewWillEnter() {
    this.fetchOffers(null);
  }
  refreshPage(event) {
    this.fetchOffers(event);
  }

  segmentChanged(event) {
    if (event.detail.value === 'offers') {
      this.fetchOffers(null);
    } else {
      this.fetchActiveOffers(null);
    }
    this.selectedMode = event.detail.value;
  }

  async fetchOffers(event) {
    const self = this;
    self.utilityService.presentLoading();
    (await self.restService.listOffer()).subscribe({
      next: (response) => {
        self.offers = response.offers;
      },
      error: (err) => {
        self.utilityService.presentToast(
          err.error.error || JSON.stringify(err.error)
        );
        self.utilityService.dismissLoading();
        if (event) {
          event.target.complete();
        }
      },
      complete: () => {
        self.utilityService.dismissLoading();
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  async fetchActiveOffers(event) {
    const self = this;
    self.utilityService.presentLoading();
    (await self.restService.listActiveOffer()).subscribe({
      next: (response) => {
        self.activeOffers = response.activeOffers;
      },
      error: (err) => {
        self.utilityService.presentToast(
          err.error.error || JSON.stringify(err.error)
        );
        self.utilityService.dismissLoading();
        if (event) {
          event.target.complete();
        }
      },
      complete: () => {
        self.utilityService.dismissLoading();
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  async fetchTakenOffers(event) {
    const self = this;

    self.utilityService.presentLoading();
    (await self.restService.listTakenOffer()).subscribe({
      next: (response) => {
        self.myOffers = response.takenOffers;
      },
      error: (err) => {
        self.utilityService.presentToast(
          err.error.error || JSON.stringify(err.error)
        );
        self.utilityService.dismissLoading();
        if (event) {
          event.target.complete();
        }
      },
      complete: () => {
        self.utilityService.dismissLoading();
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  async showNewOfferModal() {
    const modal = await this.modalCtrl.create({
      component: NewOfferOverlayComponent,
      backdropDismiss: true,
      cssClass: 'card-overlay',
      swipeToClose: true,
      showBackdrop: true,
      keyboardClose: true,
    });

    return await modal.present();
  }

  async showTakenOfferModal(element) {
    const modal = await this.modalCtrl.create({
      component: TakeOfferOverlayComponent,
      backdropDismiss: true,
      cssClass: 'card-overlay',
      swipeToClose: true,
      showBackdrop: true,
      keyboardClose: true,
      componentProps: { offer: element }
    });

    return await modal.present();
  }

  async cancelOffer(offer) {
    const self = this;
    const payload = {
      id: offer.id,
      amount: offer.amount
    };
    self.utilityService.presentLoading();
    (await self.restService.cancelOffer(payload)).subscribe({
      next: (response) => {
        self.utilityService.presentToast(response.message);
        self.activeOffers = self.activeOffers.filter(item => item.id !== offer.id);
      },
      error: (err) => {
        self.utilityService.presentToast(
          err.error.error || JSON.stringify(err.error)
        );
        self.utilityService.dismissLoading();
      },
      complete: () => {
        self.utilityService.dismissLoading();
      }
    });
  }
  async confirmOffer(element) {
    const self = this;
    const payload = {
      id: element.id,
      amount: element.amount,
      nickName: element.taker
    };
    self.utilityService.presentLoading();
    (await self.restService.confirmOffer(payload)).subscribe({
      next: (response) => {
        self.utilityService.presentToast(response.message);
        element.status = 'confirmed';
      },
      error: (err) => {
        self.utilityService.presentToast(
          err.error.error || JSON.stringify(err.error)
        );
        self.utilityService.dismissLoading();
      },
      complete: () => {
        self.utilityService.dismissLoading();
      }
    });
  }
}
