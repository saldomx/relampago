import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtpOverlayComponent } from './otp-overlay.component';

describe('OverlayComponent', () => {
  let component: OtpOverlayComponent;
  let fixture: ComponentFixture<OtpOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtpOverlayComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtpOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
