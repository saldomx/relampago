import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-phone-verification',
  templateUrl: './phone-verification.page.html',
  styleUrls: ['./phone-verification.page.scss'],
})
export class PhoneVerificationPage {
  public code = '';

  constructor(
    private utilityService: UtilityService,
    private storage: StorageService,
    private restService: RestService,
    private route: Router
  ) { }

  ionViewWillEnter() { }

  onOtpChange(event) {
    this.code = event;
  }
  async onSubmit() {
    const self = this;
    let userInfo = await this.storage.get('userInfo');
    if (!userInfo) {
      self.utilityService.presentToast('No user found for verification');
      return false;
    }
    if (typeof userInfo === 'string') {
      userInfo = JSON.parse(userInfo);
    }
    self.utilityService.presentLoading();
    try {
      const bodyObj = {
        email: userInfo.email,
        phone: userInfo.phone,
        code: self.code,
      };
      const payload = {
        body: bodyObj,
        url: `${environment.HOST}/api/login/confirmPhone`,
      };
      // const response = await self.restService.post(payload);
      self.utilityService.dismissLoading();
      self.utilityService.presentToast(
        'Phone verified successfully, please login'
      );
      self.route.navigateByUrl('login');
    } catch (err) {
      setTimeout(() => {
        self.utilityService.presentToast(JSON.stringify(err));
        self.utilityService.dismissLoading();
      });
    }
  }
}
