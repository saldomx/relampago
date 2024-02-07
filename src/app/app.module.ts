import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpService } from './services/http.service';
import { InvoiceOverlayComponent } from './pages/home/invoice-overlay/invoice-overlay.component';
import { FormsModule } from '@angular/forms';
// Import barcode scanner module
import { ZBar } from '@ionic-native/zbar/ngx';
import { WithdrawalOverlayComponent } from './pages/home/withdrawal-overlay/withdrawal-overlay.component';
import { NgMaretialModule } from './ng-maretial/ng-maretial.module';
import { NewOfferOverlayComponent } from './pages/offers/new-offer-overlay/new-offer-overlay.component';
import { TakeOfferOverlayComponent } from './pages/offers/take-offer-overlay/take-offer-overlay.component';
import { StatusOverlayComponent } from './pages/home/status-overlay/status-overlay.component';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { OtpOverlayComponent } from './pages/register/otp-overlay/otp-overlay.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { DetailOverlayComponent } from './pages/history/detail-overlay/detail-overlay.component';
@NgModule({
  declarations: [AppComponent, InvoiceOverlayComponent, WithdrawalOverlayComponent, NewOfferOverlayComponent,
    TakeOfferOverlayComponent, StatusOverlayComponent, OtpOverlayComponent, DetailOverlayComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    NgMaretialModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    NgOtpInputModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FingerprintAIO,
    ZBar,
    HttpService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
