import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
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
@NgModule({
  declarations: [AppComponent, InvoiceOverlayComponent, WithdrawalOverlayComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    NgMaretialModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ZBar,
    HttpService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
