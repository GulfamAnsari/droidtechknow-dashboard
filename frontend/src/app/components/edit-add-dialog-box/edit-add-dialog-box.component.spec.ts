import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddDialogBoxComponent } from './edit-add-dialog-box.component';

describe('EditAddDialogBoxComponent', () => {
  let component: EditAddDialogBoxComponent;
  let fixture: ComponentFixture<EditAddDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
