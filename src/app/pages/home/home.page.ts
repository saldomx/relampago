import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';
import { InvoiceOverlayComponent } from './invoice-overlay/invoice-overlay.component';
import { StatusOverlayComponent } from './status-overlay/status-overlay.component';
import { WithdrawalOverlayComponent } from './withdrawal-overlay/withdrawal-overlay.component';


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
    self.fetchUserBal(null);
  }
  refreshPage(event) {
    this.fetchUserBal(event);
  }
  async fetchUserBal(event) {
    const self = this;
    await self.utilityService.presentLoading();
    (await self.restService.getBalance()).subscribe({
      next: (data) => {
        self.userBalance = data.userBal;
      },
      error: async (err) => {
        await self.utilityService.dismissLoading();
        self.utilityService.presentToast(err);
        if (event) {
          event.target.complete();
        }
        if (err && err.status === 401) {
          self.storage.remove('auth');
          self.route.navigateByUrl('login');
        }
      },
      complete: async () => {
        self.fetchWithdrawal(event);
      }
    });
  }

  async fetchWithdrawal(event) {
    const self = this;
    (await self.restService.fetchHistory(2)).subscribe({
      next: (data) => {
        self.withdrawalTransactions = data.result;
      },
      error: async (err) => {
        await self.utilityService.dismissLoading();
        // self.utilityService.presentToast(err);
        if (event) {
          event.target.complete();
        }
      },
      complete: async () => {
        await self.utilityService.dismissLoading();
        if (event) {
          event.target.complete();
        }
      }
    });
  }

  async showWithdrawalModal() {
    const modal = await this.modalCtrl.create({
      component: WithdrawalOverlayComponent,
      backdropDismiss: true,
      cssClass: 'card-overlay',
      swipeToClose: true,
      showBackdrop: true,
      keyboardClose: true,
    });

    return await modal.present();
  }

  goToInvoice() {
    this.router.navigate(['decode-invoice']);
  }

  goToHistory() {
    this.router.navigate(['history']);
  }
  async showStatusModal(item) {
    const modal = await this.modalCtrl.create({
      component: StatusOverlayComponent,
      backdropDismiss: true,
      cssClass: 'card-overlay',
      swipeToClose: true,
      showBackdrop: true,
      keyboardClose: true,
      componentProps: { offer: item }
    });

    return await modal.present();
  }
}
