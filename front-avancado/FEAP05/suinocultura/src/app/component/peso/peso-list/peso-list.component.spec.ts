import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesoListComponent } from './peso-list.component';

describe('PesoListComponent', () => {
  let component: PesoListComponent;
  let fixture: ComponentFixture<PesoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PesoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PesoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
