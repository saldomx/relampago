import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(private route: Router, private utilityService: UtilityService, private restService: RestService,
    private storage: StorageService, private cacheService: CacheService) { }

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
      (await self.restService.login(form.value)).subscribe(async (data) => {
        self.utilityService.dismissLoading();
        await self.storage.set('auth', data.token);
        self.cacheService.setAuth(true);
        this.cacheService.publishAuthData({ auth: true });
        self.route.navigateByUrl('/home');
        console.log(data);
      });
    } catch (err) {
      setTimeout(() => {
        self.utilityService.presentToast(JSON.stringify(err));
        self.utilityService.dismissLoading();
      });
    }
  }
  goToRegister() {
    this.route.navigateByUrl('register');
  }
}
