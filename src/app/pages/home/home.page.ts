import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';
import { OverlayComponent } from './overlay/overlay.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public userBalance = '0.00';
  public withdrawalTransactions = [];
  constructor(
    private route: Router,
    private storage: StorageService,
    private restService: RestService,
    private utilityService: UtilityService,
    private modalCtrl: ModalController,
    private router: Router
  ) { }
  async ionViewWillEnter() {
    const self = this;
    const auth = await this.storage.get('auth');
    if (!auth) {
      return self.route.navigateByUrl('login');
    }
    self.fetchUserBal(null);
  }
  refreshPage(event) {
    this.fetchUserBal(event);
  }
  async fetchUserBal(event) {
    const self = this;
    const payload = {
      url: `${environment.HOST}/withdrawal/bal`,
    };
    try {
      self.utilityService.presentLoading();
      const response = await self.restService.get(payload);
      self.userBalance = response.userBal;
      setTimeout(() => {
        self.utilityService.dismissLoading();
        self.fetchWithdrawal(null);
      });
      if (event) {
        event.target.complete();
      }
    } catch (err) {
      self.utilityService.presentToast(
        err.error.error || JSON.stringify(err.error)
      );
      self.utilityService.dismissLoading();
      if (err && err.status === 401) {
        self.storage.remove('auth');
        self.route.navigateByUrl('login');
      }
      if (event) {
        event.target.complete();
      }
    }
  }

  async fetchWithdrawal(event) {
    const self = this;
    const payload = {
      url: `${environment.HOST}/smx/user/withdrawal/history?limit=2`,
    };
    try {
      self.utilityService.presentLoading();
      const response = await self.restService.get(payload);
      self.withdrawalTransactions = response.result;
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

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: OverlayComponent,
      backdropDismiss: true,
      cssClass: 'card-overlay',
      swipeToClose: true,
      showBackdrop: true,
      keyboardClose: true,
    });

    return await modal.present();
  }
  goToHistory() {
    this.router.navigate(['history']);
  }
}
