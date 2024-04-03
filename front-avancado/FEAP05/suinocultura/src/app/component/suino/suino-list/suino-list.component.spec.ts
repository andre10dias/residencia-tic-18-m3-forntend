import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuinoListComponent } from './suino-list.component';

describe('SuinoListComponent', () => {
  let component: SuinoListComponent;
  let fixture: ComponentFixture<SuinoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuinoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuinoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
