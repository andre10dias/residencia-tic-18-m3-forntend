import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tarefa } from '../tarefa.model';
import { tarefasStore } from '../store/tarefa.store';

@Component({
  selector: 'app-show-tarefas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-tarefas.component.html',
  styleUrls: ['./show-tarefas.component.css']
})
export class ShowTarefasComponent {
  tarefaSelecionada: Tarefa = { id: '', descricao: '' };

  readonly storeTarefa = inject(tarefasStore);

  removeTarefa(id: string) {
    this.storeTarefa.removerTarefa(id);
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
    this.storeTarefa.atualizarTarefa(this.tarefaSelecionada.id, novaDescricao);
    this.hideForm();
  }

  hideForm() {
    const formUpdate = document.getElementById('form-update');

    if (formUpdate) {
      formUpdate.style.display = 'none';
    }
  }

}
