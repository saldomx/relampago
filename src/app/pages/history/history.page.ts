import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilityService } from 'src/app/services/utility.service';
import { DetailOverlayComponent } from './detail-overlay/detail-overlay.component';
import * as moment from 'moment';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  public filteredHistory = []
  public moment: any = moment

  public history = [];
  constructor(private utilityService: UtilityService, private restService: RestService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async ionViewWillEnter() {
    const self = this;
    self.fetchHistory(null);
  }
  refreshPage(event) {
    this.fetchHistory(event);
  }

  async fetchHistory(event) {
    const self = this;
    await self.utilityService.presentLoading();
    (await self.restService.fetchHistory(0)).subscribe({
      next: (response) => {
        self.history = response.result;
        self.filteredHistory = response.result
      },
      error: async (err) => {
        await self.utilityService.dismissLoading();
        self.utilityService.presentToast(err.error.error || JSON.stringify(err));
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

  async showDetailModal(item) {
    const modal = await this.modalCtrl.create({
      component: DetailOverlayComponent,
      backdropDismiss: true,
      cssClass: 'detail-overlay',
      swipeToClose: true,
      showBackdrop: true,
      keyboardClose: true,
      componentProps: { transaction: item }
    });

    return await modal.present();
  }
  filterHistory(type){
    const self = this;
    if(!type){
      return self.filteredHistory = self.history
    }
    self.filteredHistory = self.history.filter(item => item.kind === type )
  }
}
