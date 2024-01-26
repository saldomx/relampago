
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';
import { environment } from 'src/environments/environment';
import { OtpOverlayComponent } from './otp-overlay/otp-overlay.component';

declare const require: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  constructor(private route: Router, private utilityService: UtilityService,
    private storage: StorageService, private restService: RestService, private modalCtrl: ModalController) { }

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
    (await self.restService.register(form.value)).subscribe({
      next: async (data) => {
      },
      error: async (err) => {
        await self.utilityService.dismissLoading()
        self.utilityService.presentToast(err || 'Something went wrong');
      },
      complete: async () => {
        await self.utilityService.dismissLoading();
        self.showOtpModal()
      }
    });
  }
  goToLogin() {
    this.route.navigateByUrl('login');
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
