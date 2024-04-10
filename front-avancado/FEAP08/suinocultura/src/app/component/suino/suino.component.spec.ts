import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuinoComponent } from './suino.component';

describe('SuinoComponent', () => {
  let component: SuinoComponent;
  let fixture: ComponentFixture<SuinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuinoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
