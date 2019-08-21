import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDashboardComponent } from './pre-dashboard.component';

describe('PreDashboardComponent', () => {
  let component: PreDashboardComponent;
  let fixture: ComponentFixture<PreDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
