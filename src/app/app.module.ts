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
import { OverlayComponent } from './pages/home/overlay/overlay.component';
import { FormsModule } from '@angular/forms';
// Import barcode scanner module
import { ZBar } from '@ionic-native/zbar/ngx';
@NgModule({
  declarations: [AppComponent, OverlayComponent],
  entryComponents: [],
  imports: [
    CommonModule,
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
