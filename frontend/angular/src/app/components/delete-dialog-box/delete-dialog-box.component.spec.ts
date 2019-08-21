

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogBoxComponent } from './delete-dialog-box.component';

describe('DeleteDialogBoxComponent', () => {
  let component: DeleteDialogBoxComponent;
  let fixture: ComponentFixture<DeleteDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
