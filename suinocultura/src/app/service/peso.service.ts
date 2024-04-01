import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject, map } from 'rxjs';

import { SuinoUtil } from '../util/suino.util';

import { PesoListDTO } from '../model/peso/peso-list.dto';
import { Peso } from '../model/peso/peso';
import { FirebaseCredentials } from '../model/firebase/firebase-credentials';
import { PesoCreateDTO } from '../model/peso/peso-create.dto';
import { PesoEditDTO } from '../model/peso/peso-edit.dto';

@Injectable({
  providedIn: 'root'
})
export class PesoService {
  fire: FirebaseCredentials = new FirebaseCredentials();
  baseUrl: string = `${this.fire.baseUrl}/peso`;
  // baseUrlSuino: string = `${this.fire.baseUrl}/suino`;
  
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

  // get listarSuinos() {
  //   return this.getSuinoAll().pipe(
  //     map(listaSuinos => {
  //       return listaSuinos.sort((a, b) => a.brincoAnimal - b.brincoAnimal);
  //     })
  //   );
  // }

  retornaListaPesosByBrincoAnimal(brincoAnimal: number): Observable<Peso[]> {
    return this.getAll().pipe(
      map(pesos => {
        if (!pesos) {
          return [];
        }

        const listaPesos = pesos.filter(peso => peso.suino.brincoAnimal === brincoAnimal);
  
        // Ordena os pesos pela dataPeso
        listaPesos.sort((a, b) => a.dataPeso.getTime() - b.dataPeso.getTime());
        return listaPesos;
      })
    );
  }

  getListaPesosBySuinoId(suinoId: string): Observable<Peso[]> {
    return this.getAll().pipe(
      map(pesos => {
        if (!pesos) {
          return [];
        }

        const listaPesos = pesos.filter(peso => peso.suino.id === suinoId);
  
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

  // private getSuinoAll(): Observable<Suino[]> {
  //   return this.http.get<{ [key: string]: Suino }>(`${this.baseUrlSuino}.json`).pipe(
  //     map(data => {
  //       const listaSuino: Suino[] = [];

  //       for (const key in data) {
  //         if (data.hasOwnProperty(key)) {
  //           listaSuino.push({ ...(data as any)[key], id: key });
  //         }
  //       }

  //       return listaSuino;
  //     })
  //   );
  // }

  // getSuinoByBrinco(brinco: number): Suino | any {
  //   this.getSuinoAll().subscribe((listaSuinos: Suino[]) => {
  //     listaSuinos.forEach((suino: any) => {
  //       if (suino.brincoAnimal === brinco) {
  //         return suino;
  //       }
  //     })

  //     return {} as Suino;
  //   });
  // }

  getPesosByBrincoAnimal(brincoAnimal: number): Observable<Peso[]> {
    return this.getAll().pipe(
      map((pesos: Peso[]) => {
        return pesos.filter(peso => peso.suino.brincoAnimal === brincoAnimal);
      })
    );
  }

  // getPesoBySuinoId(suinoId: string): Observable<Peso[]> {
  //   let lista =  this.getAll().pipe(
  //     map(pesos => pesos.filter(peso => peso.suino.id === suinoId))
  //   );

  //   return lista;
  // }

  getPesosBySuinoId(suinoId: string): Observable<Peso[]> {
    return this.getAll().pipe(
      map((pesos: Peso[]) => {
        return pesos.filter(peso => peso.suino.id === suinoId);
      })
    );
  }

  save(form: any) {
    let [anoNasc, mesNasc, diaNasc] = form.dataPeso.split('-');
    const dataPeso = new Date(Number(anoNasc), Number(mesNasc) - 1, Number(diaNasc));

    let create: PesoCreateDTO = {
      id: null,
      suino: form.suino,
      peso: form.peso,
      dataPeso: dataPeso,
      createdAt: new Date()
    }

    this.http.post(`${this.baseUrl}.json`, create).subscribe({
      next: (data: any) => {
        this.novoPeso = {
          id: data.name,
          suino: create.suino,
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
      id: form.id,
      suino: form.suino,
      peso: form.peso,
      dataPeso: dataPeso,
      createdAt: form.createdAt,
      updatedAt: new Date()
    }

    this.http.put(`${this.baseUrl}/${form.id}.json`, edit).subscribe({
      next: (data: any) => {
        this._pesoAtualizado = {
          id: edit.id,
          suino: edit.suino,
          peso: edit.peso,
          dataPeso: this.util.formatarData(edit.dataPeso, 'dd/MM/yyyy'),
          createdAt: this.util.formatarData(data.createdAt, 'dd/MM/yyyy')
        };
      },
      error: (error: any) => {
        console.log('error: ', error)
      }
    });
  }

}
