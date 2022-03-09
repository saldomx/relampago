
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';

declare const require: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
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
    self.utilityService.presentLoading();
    try {
      form.value.country = String(form.value.country.calling_code);
      const bodyObj = form.value;
      bodyObj.agent = null;
      bodyObj.fbid = null;

      const payload = {
        body: bodyObj,
        url: `${environment.HOST}/api/login/ripplev4/SignUpMX`
      };
      // const response = await self.restService.post(payload);
      // self.utilityService.dismissLoading();
      // if (response.email === form.value.email) {
      //   await this.storage.set('user', JSON.stringify(form.value));
      //   self.utilityService.presentToast('Registration done successfully, please verify phone');
      //   this.route.navigateByUrl('phone/verification');
      // }
    } catch (err) {
      setTimeout(() => {
        self.utilityService.presentToast(err.msg || JSON.stringify(err.error));
        self.utilityService.dismissLoading();
      });
    }
  }
  goToLogin() {
    this.route.navigateByUrl('login');
  }
}
