import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  public withdrawalTransactions = [];
  constructor(private utilityService: UtilityService, private restService: RestService) { }

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
    const payload = {
      url: `${environment.HOST}/smx/user/withdrawal/history`,
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

}
