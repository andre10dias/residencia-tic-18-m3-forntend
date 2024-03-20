import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesoFormComponent } from './peso-form.component';

describe('PesoFormComponent', () => {
  let component: PesoFormComponent;
  let fixture: ComponentFixture<PesoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PesoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PesoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
