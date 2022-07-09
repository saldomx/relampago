import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoInvoicePage } from './info-invoice.page';

describe('InfoInvoicePage', () => {
  let component: InfoInvoicePage;
  let fixture: ComponentFixture<InfoInvoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoInvoicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoInvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
