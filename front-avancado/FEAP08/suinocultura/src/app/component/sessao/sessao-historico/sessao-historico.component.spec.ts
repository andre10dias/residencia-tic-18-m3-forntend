import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoHistoricoComponent } from './sessao-historico.component';

describe('SessaoHistoricoComponent', () => {
  let component: SessaoHistoricoComponent;
  let fixture: ComponentFixture<SessaoHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessaoHistoricoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessaoHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
