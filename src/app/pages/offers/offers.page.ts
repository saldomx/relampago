/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';
import { NewOfferOverlayComponent } from './new-offer-overlay/new-offer-overlay.component';
import { TakeOfferOverlayComponent } from './take-offer-overlay/take-offer-overlay.component';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage {
  public selectedMode = 'offers';
  // public OFFERS_DATA = [
  //   { user: 'bitcoinusd', method: 'wallet', usdc: '100.00', action: 'Take Offer' },
  //   { user: 'ninja', method: 'bank', usdc: '100.00', action: 'Take Offer' },
  //   { user: 'ninja', method: 'bank', usdc: '100.00', action: 'Take Offer' },
  //   { user: 'ninja', method: 'bank', usdc: '100.00', action: 'Take Offer' },
  //   { user: 'ninja', method: 'bank', usdc: '100.00', action: 'Take Offer' },
  //   { user: 'ninja', method: 'bank', usdc: '100.00', action: 'Take Offer' },
  //   { user: 'ninja', method: 'bank', usdc: '100.00', action: 'Take Offer' },
  //   { user: 'ninja', method: 'bank', usdc: '100.00', action: 'Take Offer' },
  //   { user: 'ninja', method: 'bank', usdc: '100.00', action: 'Take Offer' },
  //   { user: 'bitcoinusd', method: 'wallet', usdc: '100.00', action: 'Take Offer' }
  // ];
  public MY_OFFERS_DATA = [
    { method: 'bank', total: '100.00', status: 'TAKEN', action: 'CONFIRM' },
    { method: 'UPI', total: '50.00', status: 'TAKEN', action: 'CONFIRM' },
    { method: 'bank', total: '100.00', status: 'TAKEN', action: 'CONFIRM' },
    { method: 'bank', total: '100.00', status: 'TAKEN', action: 'CONFIRM' },
    { method: 'bank', total: '100.00', status: 'TAKEN', action: 'CONFIRM' },
  ];
  public ACTIVE_OFFERS_DATA = [
    { method: 'bank', amount: '100.00', fee: '1.00', action: 'CANCEL' },
    { method: 'UPI', amount: '50.00', fee: '1.00', action: 'CANCEL' },
    { method: 'bank', amount: '100.00', fee: '1.00', action: 'CANCEL' },
    { method: 'bank', amount: '100.00', fee: '1.00', action: 'CANCEL' },
    { method: 'bank', amount: '100.00', fee: '1.00', action: 'CANCEL' },
  ];
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
      // this.fetchTakenOffers(null);
    }
    this.selectedMode = event.detail.value;
  }

  async fetchOffers(event) {
    const self = this;
    const payload = {
      url: `${environment.HOST}/offers`,
    };
    try {
      self.utilityService.presentLoading();
      const response = await self.restService.get(payload);
      self.offers = response.offers;
      setTimeout(() => {
        self.utilityService.dismissLoading();
      });
      if (event) {
        event.target.complete();
      }
    } catch (err) {
      self.utilityService.presentToast(
        err.error.error || JSON.stringify(err.error)
      );
      self.utilityService.dismissLoading();
      if (event) {
        event.target.complete();
      }
    }
  }

  async fetchActiveOffers(event) {
    const self = this;
    const payload = {
      url: `${environment.HOST}/active/offers`,
    };
    try {
      self.utilityService.presentLoading();
      const response = await self.restService.get(payload);
      self.activeOffers = response.activeOffers;
      setTimeout(() => {
        self.utilityService.dismissLoading();
      });
      if (event) {
        event.target.complete();
      }
    } catch (err) {
      self.utilityService.presentToast(
        err.error.error || JSON.stringify(err.error)
      );
      self.utilityService.dismissLoading();
      if (event) {
        event.target.complete();
      }
    }
  }

  async fetchTakenOffers(event) {
    const self = this;
    const payload = {
      url: `${environment.HOST}/taken/offers`,
    };
    try {
      self.utilityService.presentLoading();
      const response = await self.restService.get(payload);
      self.offers = response.offers;
      setTimeout(() => {
        self.utilityService.dismissLoading();
      });
      if (event) {
        event.target.complete();
      }
    } catch (err) {
      self.utilityService.presentToast(
        err.error.error || JSON.stringify(err.error)
      );
      self.utilityService.dismissLoading();
      if (event) {
        event.target.complete();
      }
    }
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
      url: `${environment.HOST}/offer`,
      body: {
        id: offer.id,
        amount: offer.amount
      }
    };
    try {
      self.utilityService.presentLoading();
      const response = await self.restService.delete(payload);
      self.utilityService.presentToast(response.message || 'Offer created successfully');
      self.activeOffers = self.activeOffers.filter(item => item.id !== offer.id);
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
