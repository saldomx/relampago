import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePage {
  public userDetail: any = {};
  public isChecked = false;

  constructor(
    private utilityService: UtilityService,
    private restService: RestService,
    private storage: StorageService,
    private cdRef: ChangeDetectorRef,
    private faio: FingerprintAIO
  ) { }

  ionViewWillEnter() {
    this.getUserInfo(null);
  }

  async getUserInfo(event) {
    const self = this;
    self.utilityService.presentLoading();
    try {
      (await self.restService.userInfo()).subscribe((response => {
        self.userDetail = response;
        self.isChecked = response.bio_enabled ? true : false;
        self.cdRef.detectChanges();
        self.utilityService.dismissLoading();
        if (event) {
          event.target.complete();
        }
      }));
    } catch (err) {
      if (event) {
        event.target.complete();
      }
      self.utilityService.presentToast(err.error.error || JSON.stringify(err));
      self.utilityService.dismissLoading();
    }
  }

  async toggleChange(event) {
    const self = this;
    self.isChecked = !self.isChecked;
    if (!self.isChecked && self.userDetail.bio_enabled) {
      return false;
    }
    try {
      if (self.isChecked) {
        await self.showFingerprintAuthDlg(self.isChecked);
      } else {
        await self.updateBioValue(self.isChecked);
      }
    } catch (error) {
      self.isChecked = !self.isChecked;
      self.changeToggleState();
      self.utilityService.presentToast(error.message || error.error || JSON.stringify(error));
    }
  }

  async updateBioValue(value) {
    const self = this;
    const reqPayload = {
      bioValue: value
    };
    self.utilityService.presentLoading();
    try {
      (await self.restService.bioUpdate(reqPayload)).subscribe((response => {
        self.utilityService.presentToast(response.message || JSON.stringify(response));
        self.utilityService.dismissLoading();
      }));
    } catch (err) {
      self.changeToggleState();
      self.utilityService.presentToast(err.error.error || JSON.stringify(err));
      self.utilityService.dismissLoading();
    }
  }

  public async showFingerprintAuthDlg(checked) {
    const self = this;
    self.faio.isAvailable()
      .then((result: any) => {
        self.faio.show({
          cancelButtonTitle: 'Cancel',
          disableBackup: false,
          title: 'Rayo Biometric',
          fallbackButtonTitle: 'FB Back Button'
        }).then(async (showResult: any) => {
          (await self.restService.getPublicKey())
            .subscribe(async (data) => {
              self.storage.set('x-client-token', data.publicKey);
              self.updateBioValue(checked);
            });
        }).catch((error: any) => {
          self.changeToggleState();
          self.utilityService.presentToast('Match not found');
        });
      }).catch(err => {
        self.changeToggleState();
        self.utilityService.presentToast('Biometric not available');
      });
  }
  changeToggleState() {
    setTimeout(() => {
      this.isChecked = !this.isChecked;
      this.cdRef.detectChanges();
    }, 100);
  }
}
