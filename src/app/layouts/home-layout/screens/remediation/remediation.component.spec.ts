import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemediationComponent } from './remediation.component';

describe('remediationComponent', () => {
  let component: RemediationComponent;
  let fixture: ComponentFixture<RemediationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemediationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemediationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
