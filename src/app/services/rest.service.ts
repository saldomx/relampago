/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpService) { }

  login(payload): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      body: payload,
      url: `${environment.HOST}/signin`
    };
    return self.http.post(reqPayload);
  }

  register(payload): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      body: payload,
      url: `${environment.HOST}/register`
    };
    return self.http.post(reqPayload);
  }

  verifyOtp(payload): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      body: payload,
      url: `${environment.HOST}/phone/verify`
    };
    return self.http.post(reqPayload);
  }

  activateAccount(payload): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      body: payload,
      url: `${environment.HOST}/account/activate`
    };
    return self.http.post(reqPayload);
  }

  resendOtp(payload): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      body: payload,
      url: `${environment.HOST}/phone/otp/resend`
    };
    return self.http.post(reqPayload);
  }

  takeOffer(offer): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/offer/take`,
      body: offer
    };
    return self.http.post(reqPayload);
  }

  createOffer(offer): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/offer`,
      body: offer
    };
    return self.http.post(reqPayload);
  }

  listOffer(): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/offers`,
    };
    return self.http.get(reqPayload);
  }

  listActiveOffer(): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/offers/active`,
    };
    return self.http.get(reqPayload);
  }

  listTakenOffer(): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/offers/taken`,
    };
    return self.http.get(reqPayload);
  }
  getTakenOffer(offerId): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/offer/taken`,
      params: { id: offerId }
    };
    return self.http.get(reqPayload);
  }
  updateStatus(offerId): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/offer/status`,
      body: { id: offerId }
    };
    return self.http.post(reqPayload);
  }

  cancelOffer(offer): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/offer/cancel`,
      body: offer
    };
    return self.http.post(reqPayload);
  }

  confirmOffer(offer): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/offer/confirm`,
      body: offer
    };
    return self.http.post(reqPayload);
  }
  sendPayment(offer) {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/transaction/withdrawal/assets`,
      body: offer
    };
    return self.http.post(reqPayload);
  }

  decodeInvoice(requestString): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/lnp/decode`,
      body: { paymentRequest: requestString }
    };
    return self.http.post(reqPayload);
  }

  payInvoice(invoiceObj): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/lnp/pay`,
      body: invoiceObj
    };
    return self.http.post(reqPayload);
  }

  getBalance(): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/withdrawal/bal`,
    };
    return self.http.get(reqPayload);
  }

  fetchHistory(limit): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/smx/user/withdrawal/history`,
    };
    if (limit) {
      reqPayload.url = `${reqPayload.url}?limit=${limit}`;
    }
    return self.http.get(reqPayload);
  }
  refreshMessage(offerId): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/offer/messages`,
      params: { id: offerId }
    };
    return self.http.get(reqPayload);
  }
  addMessage(messageObj): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/offer/message`,
      body: messageObj
    };
    return self.http.post(reqPayload);
  }

  getPublicKey(): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/user/public/key`
    };
    return self.http.get(reqPayload);
  }

  userInfo(): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/user/profile`,
    };
    return self.http.get(reqPayload);
  }

  bioUpdate(authObj): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      url: `${environment.HOST}/user/bio`,
      body: authObj
    };
    return self.http.post(reqPayload);
  }
  biometricLogin(payload): Promise<Observable<any>> {
    const self = this;
    const reqPayload = {
      body: payload,
      url: `${environment.HOST}/bio/signin`
    };
    return self.http.post(reqPayload);
  }
}
