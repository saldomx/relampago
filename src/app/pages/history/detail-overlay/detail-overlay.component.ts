import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { UtilityService } from 'src/app/services/utility.service';
import * as moment from 'moment';

@Component({
  selector: 'app-menu-overlay',
  templateUrl: './detail-overlay.component.html',
  styleUrls: ['./detail-overlay.component.scss'],
})
export class DetailOverlayComponent implements OnInit {
  public showDetails: any = false;
  public showSuccess: any = false;
  public transaction: any = {}
  public moment = moment

  constructor(private utilityService: UtilityService,
    private restService: RestService,
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private cdref: ChangeDetectorRef) { }
    ionViewWillEnter() {
      this.transaction = this.navParams.get('transaction');
      console.log(this.transaction)
    }
  ngOnInit() { }

  clearInput(form: NgForm) {
    form.reset();
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }
}
