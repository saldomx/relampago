import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CacheService } from 'src/app/services/cache.service';
import { HttpService } from 'src/app/services/http.service';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  public userDetail: any = {};
  public usdcBanalce = '0.00';

  constructor(
    private utilityService: UtilityService,
    private restService: RestService,
    private route: Router,
    private cacheService: CacheService,
    private storage: StorageService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private http: HttpService
  ) { }

  ionViewWillEnter() {
    // this.getUserInfo(null);
  }

  getServiceList(event) {
    // this.getUserInfo(event);
  }

  // async getUserInfo(event) {
  //   const self = this;
  //   try {
  //     self.cardService
  //       .getUserInfo()
  //       .then((userInfo) => {
  //         self.userDetail = userInfo;
  //         const reqObj = {
  //           uri: '/account',
  //           params: {
  //             email: this.userDetail.email,
  //           },
  //         };
  //         self.utilityService.presentLoading();
  //         self.http.get(reqObj).subscribe(
  //           (result) => {
  //             this.utilityService
  //               .dismissLoading()
  //               .then(
  //                 () =>
  //                   (self.usdcBanalce = Number(result.tokenAmount).toFixed(2))
  //               );
  //           },
  //           (error) => {
  //             self.utilityService
  //               .dismissLoading()
  //               .then(() =>
  //                 self.utilityService.presentToast(error.error || error)
  //               );
  //           }
  //         );
  //       })
  //       .catch((err) => {
  //         self.utilityService
  //           .dismissLoading()
  //           .then(() => self.utilityService.presentToast(err.error || err));
  //       });
  //     if (event) {
  //       event.target.complete();
  //     }
  //   } catch (err) {
  //     if (event) {
  //       event.target.complete();
  //     }
  //     self.utilityService.presentToast(err.error.error || JSON.stringify(err));
  //     if (err && err.status === 401) {
  //       self.storage.remove('auth');
  //       self.route.navigateByUrl('login');
  //     }
  //   }
  // }
  gotToAddCard() {
    this.route.navigateByUrl('add-card');
  }

  async deleteCard(card) {
    const self = this;
    const alert = await this.alertController.create({
      cssClass: 'warn-modal',
      header: 'Alert',
      message: `Do you want to delete card ${card.last} ?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-btn',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Confirm',
          cssClass: 'alert-btn',
          handler: async () => {
            self.utilityService.presentLoading();
            try {
              const bodyObj = { token: card.token };
              const payload = {
                body: bodyObj,
                url: `${environment.HOST}/api/ripplev4/removeCardVault`,
              };
              // const response = await self.restService.post(payload);
              self.utilityService.dismissLoading().then(() => {
                self.userDetail.numCardList =
                  self.userDetail.numCardList.filter(
                    (prop) => prop.token !== card.token
                  );
                self.utilityService.presentToast('Card removed successfully');
              });
            } catch (err) {
              setTimeout(() => {
                self.utilityService.presentToast(JSON.stringify(err));
                self.utilityService.dismissLoading();
              });
            }
          },
        },
      ],
    });

    await alert.present();
  }
  async openCardModal() {
    // const self = this;
    // const modal = await self.modalCtrl.create({
    //   component: CardOverlayComponent,
    //   backdropDismiss: true,
    //   cssClass: 'card-overlay',
    //   swipeToClose: true,
    //   showBackdrop: true,
    //   keyboardClose: true,
    // });
    // return await modal.present();
  }

  gotToAccountPage() {
    this.route.navigateByUrl('account');
  }
}
