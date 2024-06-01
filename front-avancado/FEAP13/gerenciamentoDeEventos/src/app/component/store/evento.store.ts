import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

import { Evento } from "../../model/evento";

export interface EventoState {
    eventos: Evento[];
}

export const estadoInicial: EventoState = {
    eventos: []
    // eventos: [
    //     {
    //         id: '1',
    //         nome: 'Evento 1',
    //         data: '2022-01-01',
    //         horario: '09:00',
    //         local: 'Local 1'
    //     },
    //     {
    //         id: '2',
    //         nome: 'Evento 2',
    //         data: '2022-01-02',
    //         horario: '10:00',
    //         local: 'Local 2'
    //     },
    //     {
    //         id: '3',
    //         nome: 'Evento 3',
    //         data: '2022-01-03',
    //         horario: '11:00',
    //         local: 'Local 3'
    //     }
    // ]
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
