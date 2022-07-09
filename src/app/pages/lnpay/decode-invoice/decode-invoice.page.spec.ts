import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DecodeInvoicePage } from './decode-invoice.page';

describe('DecodeInvoicePage', () => {
  let component: DecodeInvoicePage;
  let fixture: ComponentFixture<DecodeInvoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecodeInvoicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DecodeInvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
