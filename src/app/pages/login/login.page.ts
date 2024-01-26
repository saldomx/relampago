import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { ModalController } from '@ionic/angular';
import { OtpOverlayComponent } from '../register/otp-overlay/otp-overlay.component';
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
    private cdRef: ChangeDetectorRef,
    private modalCtrl: ModalController) { }

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
    (await self.restService.login(form.value)).subscribe({
      next: async (data) => {
        if (data?.user?.openOtpModal){
          self.utilityService.presentToast(data.user.error);
          self.showOtpModal()
        }else{
          await self.storage.set('auth', data.token);
          self.cacheService.setAuth(true);
          self.cacheService.publishAuthData({ auth: true });
          self.route.navigateByUrl('/home');
        }
      },
      error: async (err) => {
        await self.utilityService.dismissLoading();
        self.utilityService.presentToast(err || 'Invalid credential or not authorised user');
      },
      complete: async () => {
        await self.utilityService.dismissLoading();
      }
    });
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
          await self.utilityService.presentLoading();
          const reqPayload = {
            clientKey: clientToken
          };
          (await self.restService.biometricLogin(reqPayload))
            .subscribe({
              next: async (data) => {
                if (data.openOtpModal){
                  self.showOtpModal()
                }else{
                  await self.storage.set('auth', data.token);
                }
              },
              error: async (err) => {
                await self.utilityService.dismissLoading();
                self.utilityService.presentToast(err.error.error || 'Invalid credential or not authorised user');
              },
              complete: async () => {
                await self.utilityService.dismissLoading();
                self.cacheService.setAuth(true);
                this.cacheService.publishAuthData({ auth: true });
                self.cdRef.detectChanges();
                self.route.navigateByUrl('/home');
              }
            });
        }).catch(async (error: any) => {
          console.log(error);
          self.utilityService.presentToast('Match not found');
        });
      }).catch(err => {
        self.utilityService.presentToast(err.error || 'Biometric not available');
      });
  }
  async showOtpModal() {
    const modal = await this.modalCtrl.create({
      component: OtpOverlayComponent,
      backdropDismiss: true,
      cssClass: 'card-overlay',
      swipeToClose: true,
      showBackdrop: true,
      keyboardClose: true,
    });

    return await modal.present();
  }
}
