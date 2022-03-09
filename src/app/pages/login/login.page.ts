import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(private route: Router, private utilityService: UtilityService, private restService: RestService,
    private storage: StorageService,
    private cacheService: CacheService,
    private faio: FingerprintAIO,
    private cdRef: ChangeDetectorRef) { }

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

  public async showFingerprintAuthDlg() {
    const self = this;
    const clientToken = await this.storage.get('x-client-token');
    if (!clientToken) {
      return self.utilityService.presentToast('Please enable Biometric auth from profile page');
    }

    this.faio.isAvailable()
      .then((result: any) => {
        console.log(result);
        this.faio.show({
          cancelButtonTitle: 'Cancel',
          disableBackup: false,
          title: 'Rayo Biometric',
          fallbackButtonTitle: 'FB Back Button'
        }).then(async (showResult: any) => {
          self.utilityService.presentLoading();
          const reqPayload = {
            clientKey: clientToken
          };
          (await self.restService.biometricLogin(reqPayload))
            .subscribe(async (data) => {
              self.utilityService.dismissLoading();
              await self.storage.set('auth', data.token);
              self.cacheService.setAuth(true);
              this.cacheService.publishAuthData({ auth: true });
              self.cdRef.detectChanges();
              self.route.navigateByUrl('/home');
            });
        }).catch(async (error: any) => {
          console.log(error);
          self.utilityService.presentToast('Match not found');
        });
      }).catch(err => {
        self.utilityService.presentToast(err.error || 'Biometric not available');
      });
  }
}
