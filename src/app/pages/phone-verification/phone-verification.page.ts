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
    let userInfo = await this.storage.get('user');
    if (!userInfo) {
      self.utilityService.presentToast('No user found for verification');
      return false;
    }
    if (typeof userInfo === 'string') {
      userInfo = JSON.parse(userInfo);
    }
    await self.utilityService.presentLoading();
    const payload = {
      email: userInfo.email,
      phone: userInfo.phone,
      code: self.code,
    };
    (await self.restService.verifyOtp(payload)).subscribe({
      next: async () => {
        self.utilityService.presentToast('Phone verified successfully.');
      },
      error: async (err) => {
        await self.utilityService.dismissLoading();
        self.utilityService.presentToast(err || 'Something went wrong, please try after sometime');
      },
      complete: async () => {
        self.activateAccount();
      }
    });
  }

  async activateAccount() {
    const self = this;
    let userInfo = await this.storage.get('user');
    userInfo = JSON.parse(userInfo);
    const payload = {
      account: userInfo.account
    };
    (await self.restService.activateAccount(payload)).subscribe({
      next: async () => {
      },
      error: async (err) => {
        await self.utilityService.dismissLoading();
        self.utilityService.presentToast(err || 'Something went wrong, please try after sometime');
      },
      complete: async () => {
        await self.utilityService.dismissLoading();
        self.utilityService.presentToast('Your account has been activated, please login to use');
        this.route.navigateByUrl('login');
        await self.storage.remove('user');
      }
    });
  }

  resend() {
    this.getMobileCode();
  }

  async getMobileCode() {
    const self = this;
    let userInfo = await this.storage.get('user');
    if (!userInfo) {
      self.utilityService.presentToast('No user found for verification');
      return false;
    }
    if (typeof userInfo === 'string') {
      userInfo = JSON.parse(userInfo);
    }
    const nickname = userInfo.nick_name;
    await self.utilityService.presentLoading();
    const payload = {
      nic: nickname
    };
    (await self.restService.resendOtp(payload)).subscribe({
      next: async () => {
        self.utilityService.presentToast('OTP sent to your mobile phone.');
      },
      error: async (err) => {
        await self.utilityService.dismissLoading();
        self.utilityService.presentToast(err || 'Something went wrong, please try after sometime');
      },
      complete: async () => {
        await self.utilityService.dismissLoading();
      }
    });
  }
}
