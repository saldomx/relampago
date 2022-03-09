import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilityService } from 'src/app/services/utility.service';
import { StatusOverlayComponent } from '../home/status-overlay/status-overlay.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  public withdrawalTransactions = [];
  constructor(private utilityService: UtilityService, private restService: RestService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async ionViewWillEnter() {
    const self = this;
    self.fetchWithdrawal(null);
  }
  refreshPage(event) {
    this.fetchWithdrawal(event);
  }

  async fetchWithdrawal(event) {
    const self = this;
    try {
      self.utilityService.presentLoading();
      (await self.restService.fetchHistory(0)).subscribe(response => {
        self.withdrawalTransactions = response.result;
        setTimeout(() => {
          self.utilityService.dismissLoading();
        });
        if (event) {
          event.target.complete();
        }
      });
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
