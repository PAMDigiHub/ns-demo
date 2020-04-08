import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtdbComponent } from '@src/app/rtdb/rtdb.component';

describe('RtdbComponent', () => {
  let component: RtdbComponent;
  let fixture: ComponentFixture<RtdbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtdbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
