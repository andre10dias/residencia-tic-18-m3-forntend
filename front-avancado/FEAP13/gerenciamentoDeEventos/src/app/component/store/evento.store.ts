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
                const { nome, data, horario, local, codigo } = eventoUpdate;
                const eventoIndex = store.eventos().findIndex(evento => evento.codigo === codigo);

                // console.log('evento update: ', eventoUpdate);
                // console.log('index: ', eventoIndex);
                // console.log('eventos: ', store.eventos());
                
                if (eventoIndex !== -1) {
                    const novosEventos = [...store.eventos()];
                    novosEventos[eventoIndex].nome = nome;
                    novosEventos[eventoIndex].data = data;
                    novosEventos[eventoIndex].horario = horario;
                    novosEventos[eventoIndex].local = local;
                    patchState(store, { eventos: novosEventos });
                }
            },
        })
    )
);
