import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TakeOfferOverlayComponent } from './take-offer-overlay.component';

describe('NewOfferOverlayComponent', () => {
  let component: TakeOfferOverlayComponent;
  let fixture: ComponentFixture<TakeOfferOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TakeOfferOverlayComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TakeOfferOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
