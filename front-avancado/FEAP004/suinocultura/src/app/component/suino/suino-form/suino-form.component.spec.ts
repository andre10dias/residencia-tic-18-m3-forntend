import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuinoFormComponent } from './suino-form.component';

describe('SuinoFormComponent', () => {
  let component: SuinoFormComponent;
  let fixture: ComponentFixture<SuinoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuinoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuinoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
