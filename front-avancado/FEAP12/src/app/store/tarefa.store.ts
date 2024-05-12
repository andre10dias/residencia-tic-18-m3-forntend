import { Tarefa } from "../tarefa.model";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

export interface TarefaState {
    tarefas: Tarefa[];
}

export const estadoInicial: TarefaState = {
    tarefas: [
        { id: '1', descricao: 'Aprender Angular com a residencia TIC18 do CEPEDI' },
        { id: '2', descricao: 'Aprender NgRx com a residencia TIC18 do CEPEDI'},
        { id: '3', descricao: 'Modificando de NgRx/Store para NgRx/Signals'},]
};

export const tarefasStore = signalStore(
    { providedIn: 'root' },
    withState (
        estadoInicial
    ),
    withMethods (
        (store) => ({
            adicionarTarefa(tarefa: Tarefa) {
                patchState(store, { tarefas: [...store.tarefas(), tarefa] });
            },
            removerTarefa(id: string) {
                patchState(store, { tarefas: store.tarefas().filter(tarefa => tarefa.id !== id) });
            },
            atualizarTarefa(id: string, descricao: string) {
                const tarefaIndex = store.tarefas().findIndex(tarefa => tarefa.id === id);
                if (tarefaIndex !== -1) {
                    const novasTarefas = [...store.tarefas()];
                    novasTarefas[tarefaIndex].descricao = descricao;
                    patchState(store, { tarefas: novasTarefas });
                }
            },
        })
    )
);
