
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';
const countryCode = require('../../../assets/DIAL_CODES.json');

declare const require: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  public contryList = countryCode;
  constructor(private route: Router, private utilityService: UtilityService,
    private storage: StorageService, private restService: RestService) { }

  async ionViewWillEnter() {
    const self = this;
    const auth = await this.storage.get('auth');
    if (auth) {
      return self.route.navigateByUrl('home');
    }
  }

  async onSubmit(form: NgForm) {
    const self = this;
    await self.utilityService.presentLoading();
    const reqObj = Object.assign({ ...form.value });

    reqObj.country = String(form.value.country.country);
    reqObj.phone = `+${form.value.country.calling_code}${form.value.phone}`;
    (await self.restService.register(reqObj)).subscribe({
      next: async (response) => {
        reqObj.account=response.user.account;
        await self.storage.set('user', JSON.stringify(reqObj));
        self.utilityService.presentToast('Registration done successfully, please verify phone');
      },
      error: async (err) => {
        await self.utilityService.dismissLoading();
        self.utilityService.presentToast(err || 'Something went wrong, please try after sometime');
      },
      complete: async () => {
        await self.utilityService.dismissLoading();
        self.route.navigateByUrl('phone/verification');
      }
    });
  }

  goToLogin() {
    this.route.navigateByUrl('login');
  }
}
