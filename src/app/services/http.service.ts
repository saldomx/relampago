import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, of, throwError } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * http service to send REST API request to server
 *
 * @export
 * @class HttpService
 */
@Injectable()
export class HttpService {
  private url = environment.SALDO_HOST;
  constructor(private httpClient: Http, private route: Router) {}

  /**
   * Prepare header for every request
   *
   * @returns
   * @memberof HttpService
   */
  getHeader() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  get(req: any): Observable<any> {
    const url = this.url + req.uri;
    const requestOptions = new RequestOptions({
      headers: this.getHeader(),
      params: req.params,
    });
    return this.httpClient.get(url, requestOptions).pipe(
      map((response) => response.json()),
      catchError(this.handleError<any>(''))
    );
  }

  post(req: any): Observable<any> {
    const url = this.url + req.uri;
    const body = JSON.stringify(req.body);
    const requestOptions = new RequestOptions({
      headers: this.getHeader(),
      body: req.body,
    });
    return this.httpClient.post(url, body, requestOptions).pipe(
      map((response) => response.json()),
      catchError(this.handleError<any>(''))
    );
  }

  put(req: any): Observable<any> {
    const url = this.url + req.uri;
    const body = JSON.stringify(req.body);
    const requestOptions = new RequestOptions({
      headers: this.getHeader(),
      params: req.params,
    });
    return this.httpClient.put(url, body, requestOptions).pipe(
      map((response) => response.json()),
      catchError(this.handleError<any>(''))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (errorObj: any): Observable<T> => {
      const statusCode = errorObj.status;
      if (errorObj) {
        errorObj = errorObj.json();
        errorObj.statusCode = statusCode;
        return throwError(errorObj);
      }
    };
  }
}
