import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoAnimalListComponent } from './historico-animal-list.component';

describe('HistoricoAnimalListComponent', () => {
  let component: HistoricoAnimalListComponent;
  let fixture: ComponentFixture<HistoricoAnimalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoricoAnimalListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricoAnimalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
