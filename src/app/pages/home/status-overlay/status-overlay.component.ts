import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-status-overlay',
  templateUrl: './status-overlay.component.html',
  styleUrls: ['./status-overlay.component.scss'],
})
export class StatusOverlayComponent implements AfterContentChecked {
  public offer: any;
  public messages: any = [];
  public message: any = '';

  constructor(private modalCtrl: ModalController, private restService: RestService,
    private utilityService: UtilityService, public navParams: NavParams,
    private cdref: ChangeDetectorRef) { }

  ionViewWillEnter() {
    this.offer = this.navParams.get('offer');
    this.refreshStatus();
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async refreshStatus() {
    const self = this;

    await self.utilityService.presentLoading();
    (await self.restService.refreshMessage(self.offer.id)).subscribe({
      next: (response) => {
        self.messages = response.messages;
      },
      error: async (err) => {
        await self.utilityService.dismissLoading();
        self.utilityService.presentToast(
          err.error.error || JSON.stringify(err.error)
        );
      },
      complete: async () => {
        await self.utilityService.dismissLoading();
      }
    });
  }
  async confirmPayment() {
    const self = this;

    await self.utilityService.presentLoading();
    (await self.restService.updateStatus(this.offer.id)).subscribe({
      next: () => {
        self.offer.taker_confirmed = 1;
      },
      error: async (err) => {
        await self.utilityService.dismissLoading();
        self.utilityService.presentToast(
          err.error.error || JSON.stringify(err.error)
        );
      },
      complete: async () => {
        await self.utilityService.dismissLoading();
      }
    });
  }
  async addMessage() {
    const self = this;
    const reqObj = {
      message: self.message,
      isOwner: self.offer.isOwner,
      id: self.offer.id
    };
    await self.utilityService.presentLoading();
    (await self.restService.addMessage(reqObj)).subscribe({
      next: () => { },
      error: async (err) => {
        await self.utilityService.dismissLoading();
        self.utilityService.presentToast(
          err.error.error || JSON.stringify(err.error)
        );
      },
      complete: async () => {
        await self.utilityService.dismissLoading();
        self.message = '';
        self.refreshStatus();
      }
    });
  }
}
