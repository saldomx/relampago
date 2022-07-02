import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  private loaderEvent;
  private toast;
  private isLoading = false;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  async presentLoading() {
    this.loaderEvent = await this.loadingController.create({
      message: 'Please wait...',
      cssClass: 'spin-loader',
    });
    await this.loaderEvent.present();
  }
  async dismissLoading() {
    await this.loaderEvent.dismiss()
      .then(() => console.log('dismissed'));
  }
  async presentToast(text) {
    this.toast = await this.toastController.create({
      message: text,
      duration: environment.TOAST_DURATION,
      position: 'bottom',
      cssClass: 'cssClass',
    });
    this.toast.present();
  }
  async hideToast() {
    await this.toast.onDidDismiss();
  }
}
