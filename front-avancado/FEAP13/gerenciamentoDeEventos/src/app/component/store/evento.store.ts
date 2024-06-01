import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

import { Evento } from "../../model/evento";

export interface EventoState {
    eventos: Evento[];
}

export const estadoInicial: EventoState = {
    eventos: []
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
            removerEvento(id: string) {
                patchState(store, { eventos: store.eventos().filter(evento => evento.id !== id) });
            },
            atualizarEvento(eventoUpdate: Evento) {
                const eventoIndex = store.eventos().findIndex(evento => evento.id === eventoUpdate.id);
                
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
