import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ZBar } from '@ionic-native/zbar/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-overlay',
  templateUrl: './otp-overlay.component.html',
  styleUrls: ['./otp-overlay.component.scss'],
})
export class OtpOverlayComponent  {
  public code = '';

  constructor(
    private utilityService: UtilityService,
    private storage: StorageService,
    private restService: RestService,
    private route: Router,
    private modalCtrl: ModalController
  ) { }

  ionViewWillEnter() { }

  onOtpChange(event) {
    this.code = event;
  }
  async onSubmit() {
    const self = this;
    await self.utilityService.presentLoading();
    try {
      const bodyObj = {
        code: self.code,
      };

      const response = (await self.restService.verifyPhone(bodyObj))
      .subscribe({
        next: async (data) => {
        },
        error: async (err) => {
          await self.utilityService.dismissLoading()
          self.utilityService.presentToast(err || 'Something went wrong');
        },
        complete: async () => {
          await self.utilityService.dismissLoading();
          self.utilityService.presentToast(
            'Phone verified successfully, please login'
          );
          self.dismiss()
          self.route.navigateByUrl('login');
        }
      });
    } catch (err) {
      setTimeout(async() => {
        self.utilityService.presentToast(JSON.stringify(err));
        await self.utilityService.dismissLoading();
      });
    }
  }
  async dismiss() {
    await this.modalCtrl.dismiss();
  }
}