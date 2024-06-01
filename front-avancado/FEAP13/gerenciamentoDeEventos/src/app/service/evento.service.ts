import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { FirebaseCredentials } from '../model/firebase/firebase-credentials';

import { Evento } from '../model/evento';
import { eventosStore } from '../component/store/evento.store';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  fire: FirebaseCredentials = new FirebaseCredentials();
  baseUrl: string = `${this.fire.baseUrl}/evento`;

  readonly storeEvento = inject(eventosStore);

  constructor(private http: HttpClient) { }

  getAll(): Observable<Evento[]> {
    return this.http.get<{ [key: string]: Evento }>(`${this.baseUrl}.json`).pipe(
      map(data => {
        const listaEventos: Evento[] = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            // this.storeEvento.adicionarEvento({ ...(data as any)[key], id: key });
            listaEventos.push({ ...(data as any)[key], id: key });
          }
        }

        return listaEventos;
      })
    );
  }

  save(evento: Evento) {
    this.http.post(`${this.baseUrl}.json`, evento).subscribe({
      next: (data: any) => {
        evento.id = data.name;
        this.storeEvento.adicionarEvento(evento);
      },
      error: (error: any) => {
        console.log('error: ', error)
      }
    });
  }

  update(evento: Evento): void {
    this.http.put(`${this.baseUrl}/${evento.id}.json`, evento).subscribe({
      next: (data: any) => {
        this.storeEvento.atualizarEvento(evento);
      },
      error: (error: any) => {
        console.log('error: ', error)
      }
    });
  }

  delete(id: string): void {
    try {
      this.http.delete(`${this.baseUrl}/${id}.json`).subscribe({
        next: (data: any) => {
          this.storeEvento.removerEvento(id);
        },
        error: (error: any) => {
          console.log('error: ', error)
        }
      });
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
    }
  }
  
}
