import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer.component';


@NgModule({
  imports: [CommonModule, FormsModule,IonicModule],
  exports: [FooterComponent],
  declarations: [FooterComponent]
})
export class FooterModule { }
