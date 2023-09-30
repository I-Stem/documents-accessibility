import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemediationSuccessComponent } from './remediation-success.component';

describe('RemediationSuccessComponent', () => {
  let component: RemediationSuccessComponent;
  let fixture: ComponentFixture<RemediationSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemediationSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemediationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
