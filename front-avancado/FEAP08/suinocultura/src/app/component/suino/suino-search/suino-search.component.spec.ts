import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuinoSearchComponent } from './suino-search.component';

describe('SuinoSearchComponent', () => {
  let component: SuinoSearchComponent;
  let fixture: ComponentFixture<SuinoSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuinoSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuinoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
