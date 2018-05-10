import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertAppComponent } from './convert-app.component';

describe('ConvertAppComponent', () => {
  let component: ConvertAppComponent;
  let fixture: ComponentFixture<ConvertAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvertAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
