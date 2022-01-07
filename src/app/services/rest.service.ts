/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient, private storage: StorageService) { }

  async postWithClient(payload) {
    const headerObj = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http
      .post<any>(payload.url, payload.body, { headers: headerObj })
      .toPromise();
  }

  async post(payload) {
    const item = await this.storage.get('auth');
    const headerObj = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${item}`,
    });

    return this.http
      .post<any>(payload.url, payload.body, { headers: headerObj })
      .toPromise();
  }

  async get(payload) {
    const item = await this.storage.get('auth');
    const headerObj = new HttpHeaders({
      'content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${item}`,
    });
    return this.http.get<any>(payload.url, { headers: headerObj }).toPromise();
  }
}
