import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header.component';


@NgModule({
  imports: [CommonModule, FormsModule,IonicModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
