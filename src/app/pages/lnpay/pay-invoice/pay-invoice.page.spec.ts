import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayInvoicePage } from './pay-invoice.page';

describe('PayInvoicePage', () => {
  let component: PayInvoicePage;
  let fixture: ComponentFixture<PayInvoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayInvoicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayInvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
