import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject, map } from 'rxjs';
import { PesoListDTO } from '../model/peso/peso-list.dto';
import { SuinoUtil } from '../util/suino.util';
import { Peso } from '../model/peso/peso';
import { FirebaseCredentials } from '../model/firebase/firebase-credentials';
import { PesoCreateDTO } from '../model/peso/peso-create.dto';
import { PesoEditDTO } from '../model/peso/peso-edit.dto';
import { Suino } from '../model/suino/suino';
import { PesoChartDTO } from '../model/peso/peso-chart.dto';

@Injectable({
  providedIn: 'root'
})
export class PesoService {
  fire: FirebaseCredentials = new FirebaseCredentials();
  baseUrl: string = `${this.fire.baseUrl}/peso`;
  baseUrlSuino: string = `${this.fire.baseUrl}/suino`;
  
  private novoPesoSubject = new Subject<any>();
  private novoPeso: PesoListDTO = {} as PesoListDTO;

  // private _listaPesosAnimal: number[] = [];

  private _pesoAtualizado: PesoListDTO = {} as PesoListDTO;

  constructor(
    private http: HttpClient,
    private util: SuinoUtil
  ) { }

  get novoPesoObservable() {
    return this.novoPesoSubject.asObservable();
  }

  get pesoAtualizado() {
    return this._pesoAtualizado;
  }

  novoPesoAdicionado() {
    setTimeout(() => {
      this.novoPesoSubject.next(this.novoPeso);
    }, 1000);
  }

  // retorna a lista de pesos ordenados e sem valores repetidos
  get listaPesosAnimal() {
    return this.getSuinoAll().pipe(
      map(listaSuino => {
        const pesosUnicos = new Set<number>();
        listaSuino.forEach(suino => pesosUnicos.add(suino.brincoAnimal));
        return Array.from(pesosUnicos).sort((a, b) => a - b);
      })
    );
  }

  retornaListaPesosByBrincoAnimal(brincoAnimal: number): Observable<Peso[]> {
    return this.getAll().pipe(
      map(pesos => {
        if (!pesos) {
          return [];
        }

        const listaPesos = pesos.filter(peso => peso.brincoAnimal === brincoAnimal);
  
        // Ordena os pesos pela dataPeso
        listaPesos.sort((a, b) => a.dataPeso.getTime() - b.dataPeso.getTime());
        return listaPesos;
      })
    );
  }

  getAll(): Observable<Peso[]> {
    return this.http.get<{ [key: string]: Peso }>(`${this.baseUrl}.json`).pipe(
      map(data => {
        const listaPeso: Peso[] = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            listaPeso.push({ ...(data as any)[key], id: key });
          }
        }

        return listaPeso;
      })
    );
  }

  getPesoById(id: string): Observable<Peso> {
    return this.http.get<Peso>(`${this.baseUrl}/${id}.json`).pipe(
      map((data: any) => {
        data.id = id;
        return data as Peso;
      })
    );
  }

  private getSuinoAll(): Observable<Suino[]> {
    return this.http.get<{ [key: string]: Suino }>(`${this.baseUrlSuino}.json`).pipe(
      map(data => {
        const listaSuino: Suino[] = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            listaSuino.push({ ...(data as any)[key], id: key });
          }
        }

        return listaSuino;
      })
    );
  }

  getPesoByBrincoAnimal(brincoAnimal: number): Observable<Peso[]> {
    let lista =  this.getAll().pipe(
      map(pesos => pesos.filter(peso => peso.brincoAnimal === brincoAnimal))
    );

    return lista;
  }

  save(form: any) {
    let [anoNasc, mesNasc, diaNasc] = form.dataPeso.split('-');
    const dataPeso = new Date(Number(anoNasc), Number(mesNasc) - 1, Number(diaNasc));

    let create: PesoCreateDTO = {
      id: null,
      brincoAnimal: form.brincoAnimal,
      peso: form.peso,
      dataPeso: dataPeso,
      createdAt: new Date()
    }

    this.http.post(`${this.baseUrl}.json`, create).subscribe({
      next: (data: any) => {
        this.novoPeso = {
          id: data.name,
          brincoAnimal: create.brincoAnimal,
          peso: create.peso,
          dataPeso: this.util.formatarData(create.dataPeso, 'dd/MM/yyyy'),
          createdAt: this.util.formatarData(create.createdAt, 'dd/MM/yyyy')
        };
      },
      error: (error: any) => {
        console.log('error: ', error)
      }
    });
  }

  edit(form: any): void {
    let [anoNasc, mesNasc, diaNasc] = form.dataPeso.split('-');
    const dataPeso = new Date(Number(anoNasc), Number(mesNasc) - 1, Number(diaNasc));

    let edit: PesoEditDTO = {
      brincoAnimal: form.brincoAnimal,
      peso: form.peso,
      dataPeso: dataPeso,
      createdAt: form.createdAt,
      updatedAt: new Date()
    }

    this.http.put(`${this.baseUrl}/${form.id}.json`, edit).subscribe({
      next: (data: any) => {
        this._pesoAtualizado = {
          id: data.id,
          brincoAnimal: edit.brincoAnimal,
          peso: edit.peso,
          dataPeso: this.util.formatarData(edit.dataPeso, 'dd/MM/yyyy'),
          createdAt: this.util.formatarData(edit.createdAt, 'dd/MM/yyyy')
        };
      },
      error: (error: any) => {
        console.log('error: ', error)
      }
    });
  }

}
