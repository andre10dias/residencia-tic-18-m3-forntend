import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesoHistoricoComponent } from './peso-historico.component';

describe('PesoHistoricoComponent', () => {
  let component: PesoHistoricoComponent;
  let fixture: ComponentFixture<PesoHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PesoHistoricoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PesoHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
