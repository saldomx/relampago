import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  private loaderEvent;
  private toast;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  async presentLoading() {
    this.loaderEvent = await this.loadingController.create({
      message: 'Please wait...',
      cssClass: 'spin-loader',
    });
    await this.loaderEvent.present();
  }
  async dismissLoading() {
    const res = await this.loaderEvent.dismiss();
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
    const { role } = await this.toast.onDidDismiss();
  }
}
