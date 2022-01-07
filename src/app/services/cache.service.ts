import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  public userInfo: any = {};
  public auth: any = false;
  private authSubject = new Subject<any>();

  constructor() {}

  setUserInfo(user) {
    this.userInfo = user;
  }
  getUserInfo() {
    return this.userInfo;
  }
  setAuth(auth) {
    this.auth = auth;
  }
  getAuth() {
    return this.auth;
  }

  publishAuthData(data: any) {
    this.authSubject.next(data);
  }

  getAuthObservable(): Subject<any> {
    return this.authSubject;
  }
}
