import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoHistoricoGraficoComponent } from './sessao-historico-grafico.component';

describe('SessaoHistoricoGraficoComponent', () => {
  let component: SessaoHistoricoGraficoComponent;
  let fixture: ComponentFixture<SessaoHistoricoGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessaoHistoricoGraficoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessaoHistoricoGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
