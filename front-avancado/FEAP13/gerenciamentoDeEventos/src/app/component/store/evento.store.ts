import { Evento } from "../../model/evento";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

export interface EventoState {
    eventos: Evento[];
}

export const estadoInicial: EventoState = {
    eventos: [],
    // eventos: [
    //     { id: '1', descricao: 'Aprender Angular com a residencia TIC18 do CEPEDI' },
    //     { id: '2', descricao: 'Aprender NgRx com a residencia TIC18 do CEPEDI'},
    //     { id: '3', descricao: 'Modificando de NgRx/Store para NgRx/Signals'},]
};

export const eventosStore = signalStore(
    { providedIn: 'root' },
    withState (
        estadoInicial
    ),
    withMethods (
        (store) => ({
            adicionarEvento(evento: Evento) {
                patchState(store, { eventos: [...store.eventos(), evento] });
            },
            removerEvento(codigo: string) {
                patchState(store, { eventos: store.eventos().filter(evento => evento.codigo !== codigo) });
            },
            atualizarEvento(eventoUpdate: Evento) {
                const eventoIndex = store.eventos().findIndex(evento => evento.codigo === eventoUpdate.codigo);
                
                if (eventoIndex !== -1) {
                    const novosEventos = [...store.eventos()];
                    novosEventos[eventoIndex].nome = eventoUpdate.nome;
                    novosEventos[eventoIndex].data = eventoUpdate.data;
                    novosEventos[eventoIndex].horario = eventoUpdate.horario;
                    novosEventos[eventoIndex].local = eventoUpdate.local;
                    patchState(store, { eventos: novosEventos });
                }
            },
        })
    )
);
