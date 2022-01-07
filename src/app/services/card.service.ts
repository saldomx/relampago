import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { RestService } from './rest.service';
import { StorageService } from './storage.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private userInfo: any = {};
  constructor(
    private restService: RestService,
    private utilityService: UtilityService,
    private route: Router,
    private storage: StorageService,
    private httpClient: HttpService
  ) {}
  async getUserPayload() {
    const self = this;
    self.utilityService.presentLoading();
    try {
      const payload = {
        url: `${environment.HOST}/api/ripplev4/getBalance`,
      };
      const response = await self.restService.get(payload);
      self.utilityService.dismissLoading();
      self.userInfo = response.user;
      return this.userInfo;
    } catch (err) {
      self.utilityService.dismissLoading();
      self.utilityService.presentToast(err.error.error || JSON.stringify(err));
      if (err && err.error && err.error.error === 'invalid_token') {
        self.storage.remove('auth');
        self.route.navigateByUrl('login');
      }
      return false;
    }
  }
  async getUserInfo() {
    if (Object.keys(this.userInfo).length) {
      return this.userInfo;
    } else {
      this.userInfo = await this.getUserPayload();
      return this.userInfo;
    }
  }
  getPublicKey(): any {
    const self = this;
    const reqObj = {
      uri: '/circle/encryption/key',
    };
    return new Promise((resolve, reject) => {
      self.httpClient.get(reqObj).subscribe(
        (data: any) => resolve(data),
        (error: any) => reject(error)
      );
    });
  }
  addCard(bodyObj: any): any {
    const self = this;
    const reqObj = {
      uri: '/circle/card',
      body: bodyObj,
    };
    return new Promise((resolve, reject) => {
      self.httpClient.post(reqObj).subscribe(
        (data: any) => resolve(data),
        (error: any) => reject(error)
      );
    });
  }
  makeCardPayment(bodyObj: any): any {
    const self = this;
    const reqObj = {
      uri: '/circle/card/payment',
      body: bodyObj,
    };
    return new Promise((resolve, reject) => {
      self.httpClient.post(reqObj).subscribe(
        (data: any) => resolve(data),
        (error: any) => reject(error)
      );
    });
  }
  getConversionRate() {
    const self = this;
    const reqObj = {
      uri: '/uphold/rate',
    };
    return new Promise((resolve, reject) => {
      self.httpClient.get(reqObj).subscribe(
        (data: any) => resolve(data),
        (error: any) => reject(error)
      );
    });
  }
}
