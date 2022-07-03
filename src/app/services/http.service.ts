/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from './storage.service';
import { CacheService } from './cache.service';
import { UtilityService } from './utility.service';

/**
 * http service to send REST API request to server
 *
 * @export
 * @class HttpService
 */
@Injectable()
export class HttpService {
  constructor(private httpClient: HttpClient, private route: Router,
    private storage: StorageService, private cacheService: CacheService,
    private utilityService: UtilityService) { }

  /**
   * Prepare header for every request
   *
   * @returns
   * @memberof HttpService
   */
  async getHeaders() {
    const token = await this.storage.get('auth');
    if (token) {
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
    } else {
      return {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
    }
  }

  async get(req: any): Promise<Observable<any>> {
    const self = this;
    const headers = await this.getHeaders();
    const url = req.url;
    const requestOptions = {
      headers: new HttpHeaders(headers),
      params: req.params
    };
    return self.httpClient.get<any>(url, requestOptions)
      .pipe(catchError(self.errorHandler.bind(self)));
  }

  async post(req: any): Promise<Observable<any>> {
    const self = this;
    const headers = await this.getHeaders();
    const url = req.url;
    const body = JSON.stringify(req.body);
    const requestOptions = {
      headers: new HttpHeaders(headers),
      params: req.params
    };

    return self.httpClient.post<any>(url, body, requestOptions)
      .pipe(catchError(self.errorHandler.bind(self)));
  }

  async put(req: any): Promise<Observable<any>> {
    const self = this;
    const headers = await this.getHeaders();
    const url = req.url;
    const body = JSON.stringify(req.body);
    const requestOptions = {
      headers: new HttpHeaders(headers),
      params: req.params
    };
    return self.httpClient.put(url, body, requestOptions)
      .pipe(catchError(self.errorHandler.bind(self)));
  }

  /** Error Handling method */

  async errorHandler(errorObj: HttpErrorResponse) {
    const statusCode = errorObj.status;
    if (statusCode === 401) {
      await this.storage.remove('auth');
      this.utilityService.presentToast(JSON.stringify(errorObj.error.error));
      this.cacheService.publishAuthData({ auth: false });
      this.route.navigateByUrl('login');
    }
    throw new Error(errorObj.error.error);
  }
}
