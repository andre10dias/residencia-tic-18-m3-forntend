import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefaState } from '../store/tarefa.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectorSelecionaTarefa } from '../store/tarefa.seletors';
import { Tarefa } from '../tarefa.model';
import { removerTarefa, atualizarTarefa } from '../store/tarefa.actions';

@Component({
  selector: 'app-show-tarefas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-tarefas.component.html',
  styleUrls: ['./show-tarefas.component.css']
})
export class ShowTarefasComponent {
  tarefas: Tarefa[] = [{id: '1', descricao: 'Descrição 1'},];
  tasks$!: Observable<TarefaState>;

  tarefaSelecionada: Tarefa = { id: '', descricao: '' };

  constructor(private store:Store<{tarefas: TarefaState}>) { }

  ngOnInit() {
    this.tasks$ = this.store.select(selectorSelecionaTarefa);
    this.tasks$.subscribe((t) => {  
      this.tarefas = t.tarefas;
    });
  }

  removeTarefa(id: string) {
    this.store.dispatch(removerTarefa({id: id}));
  }

  showForm(tarefa: Tarefa) {
    this.tarefaSelecionada = { ...tarefa };

    const formUpdate = document.getElementById('form-update');
    if (formUpdate) {
      formUpdate.style.display = 'block';
    }
  }

  atualizarTarefa() {
    const novaDescricao = (document.getElementById('nova-descricao') as HTMLInputElement).value;
    this.store.dispatch(atualizarTarefa({id: this.tarefaSelecionada.id, descricao: novaDescricao}));
    this.hideForm();
  }

  hideForm() {
    const formUpdate = document.getElementById('form-update');

    if (formUpdate) {
      formUpdate.style.display = 'none';
    }
  }

}
