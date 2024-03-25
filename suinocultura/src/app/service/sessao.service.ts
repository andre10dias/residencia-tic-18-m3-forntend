import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject, forkJoin, map } from 'rxjs';

import { Sessao } from '../model/sessao/sessao';
import { FirebaseCredentials } from '../model/firebase/firebase-credentials';
import { SessaoCreateDTO } from '../model/sessao/sessao-create.dto';
import { SessaoListDTO } from '../model/sessao/sessao-list.dto';
import { SuinoUtil } from '../util/suino.util';
import { SessaoEditDTO } from '../model/sessao/sessao-edit.dto';
import { Suino } from '../model/suino/suino';
import { Atividade } from '../model/sessao/atividade';
import { SessaoFormDTO } from '../model/sessao/sessao-form.dto';
import { AtividadeDTO } from '../model/sessao/atividade.dto';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {
  fire: FirebaseCredentials = new FirebaseCredentials();
  baseUrl: string = `${this.fire.baseUrl}/sessao`;
  baseUrlAtividade: string = `${this.fire.baseUrl}/atividade`;
  baseUrlSuino: string = `${this.fire.baseUrl}/suino`;

  private novaSessaoSubject = new Subject<any>();
  private novaSessao: SessaoListDTO = {} as SessaoListDTO;

  private _sessaoAtualizada: SessaoListDTO = {} as SessaoListDTO;

  constructor(
    private http: HttpClient,
    private util: SuinoUtil
  ) { }

  getAll(): Observable<Sessao[]> {
    return this.http.get<{ [key: string]: Sessao }>(`${this.baseUrl}.json`).pipe(
      map(data => {
        const listaSessao: Sessao[] = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            listaSessao.push({ ...(data as any)[key], id: key });
          }
        }

        return listaSessao;
      })
    );
  }

  getAtividadeAll(): Observable<Atividade[]> {
    return this.http.get<{ [key: string]: Atividade }>(`${this.baseUrlAtividade}.json`).pipe(
      map(data => {
        const listaAtividades: Atividade[] = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            listaAtividades.push({ ...(data as any)[key], id: key });
          }
        }

        return listaAtividades;
      })
    );
  }

  getSessaoById(id: string): Observable<Sessao> {
    return this.http.get<Sessao>(`${this.baseUrl}/${id}.json`).pipe(
      map((data: any) => {
        data.id = id;
        console.log('[sessao.service] getSessaoById: ', data);
        return data as Sessao;
      })
    );
  }

  getSuinoById(id: string): Observable<Suino> {
    return this.http.get<Suino>(`${this.baseUrlSuino}/${id}.json`).pipe(
      map((data: any) => {
        data.id = id;
        return data as Suino;
      })
    );
  }

  getAtividadeById(id: string): Observable<Atividade> {
    return this.http.get<Atividade>(`${this.baseUrlAtividade}/${id}.json`).pipe(
      map((data: any) => {
        data.id = id;
        return data as Atividade;
      })
    );
  }

  getListaSuinos(suinosId: string[]): Observable<Suino[]> {
    console.log('[sessao.service] getListaSuinos: ', suinosId);
    const observables = suinosId.map(id => this.getSuinoById(id));
    return forkJoin(observables);
  }

  getListaAtividades(atividadesId: string[]): Observable<Atividade[]> {
    console.log('[sessao.service] getListaAtividades: ', atividadesId);
    const observables = atividadesId.map(id => this.getAtividadeById(id));
    return forkJoin(observables);
  }

  save(form: any) {
    let [ano, mes, dia] = form.dataSessao.split('-');
    const dataSessao = new Date(Number(ano), Number(mes) - 1, Number(dia));

    let suinos: Suino[];
    let atividades: Atividade[];

    forkJoin([
        this.getListaSuinos(form.suinosId),
        this.getListaAtividades(form.atividadesId)
    ]).subscribe(([suinosData, atividadesData]) => {
        suinos = suinosData;
        atividades = atividadesData;

        console.log('[sessao.service] save suinos: ', suinos);
        console.log('[sessao.service] save atividades: ', atividades);

        let create: SessaoCreateDTO = {
            id: null,
            dataSessao: dataSessao,
            descricao: form.descricao,
            suinos: suinos,
            atividades: atividades,
            createdAt: new Date()
        };

        console.log('[sessao.service] save: ', create);

        this.http.post(`${this.baseUrl}.json`, create).subscribe({
            next: (data: any) => {
                this.novaSessao = {
                    id: data.name,
                    dataSessao: this.util.formatarData(create.dataSessao, 'dd/MM/yyyy'),
                    descricao: form.descricao,
                    suinos: form.suinos,
                    atividades: form.atividades,
                    createdAt: this.util.formatarData(create.createdAt, 'dd/MM/yyyy')
                };
            },
            error: (error: any) => {
                console.log('error: ', error)
            }
        });
    });
}

  edit(form: any): void {
    let [ano, mes, dia] = form.dataSessao.split('-');
    const dataSessao = new Date(Number(ano), Number(mes) - 1, Number(dia));

    console.log('[sessao.service] edit form: ', form);

    let suinos: Suino[];
    let atividades: Atividade[];

    forkJoin([
        this.getListaSuinos(form.suinosId),
        this.getListaAtividades(form.atividadesId)
    ]).subscribe(([suinosData, atividadesData]) => {
        suinos = suinosData;
        atividades = atividadesData;

        console.log('[sessao.service] edit suinos: ', suinos);
        console.log('[sessao.service] edit atividades: ', atividades);

        let edit: SessaoEditDTO = {
          id: form.id,
          dataSessao: dataSessao,
          descricao: form.descricao,
          suinos: suinos,
          atividades: atividades,
          createdAt: form.createdAt,
          updatedAt: new Date()
        }

        console.log('[sessao.service] edit: ', edit);

        this.http.put(`${this.baseUrl}/${form.id}.json`, edit).subscribe({
            next: (data: any) => {
              console.log('[sessao.service] edit', data);
              this._sessaoAtualizada = {
                id: data.id,
                descricao: edit.descricao,
                dataSessao: this.util.formatarData(new Date(edit.dataSessao), 'dd/MM/yyyy'),
                suinos: edit.suinos,
                atividades: edit.atividades,
                createdAt: this.util.formatarData(new Date(edit.createdAt), 'dd/MM/yyyy')
              };
            },
            error: (error: any) => {
                console.log('error: ', error)
            }
        });
    });















    // let edit: SessaoEditDTO = {
    //   id: form.id,
    //   dataSessao: form.dataSessao,
    //   descricao: form.descricao,
    //   suinos: form.suinos,
    //   atividades: form.atividades,
    //   createdAt: form.createAt,
    //   updatedAt: new Date()
    // }

    // this.http.put(`${this.baseUrl}/${form.id}.json`, edit).subscribe({
    //   next: (data: any) => {
    //     console.log('[sessao.service] edit', data);
    //     this._sessaoAtualizada = {
    //       id: data.id,
    //       descricao: form.descricao,
    //       dataSessao: this.util.formatarData(new Date(edit.dataSessao), 'dd/MM/yyyy'),
    //       suinos: form.suinos,
    //       atividades: form.atividades,
    //       createdAt: this.util.formatarData(new Date(edit.createdAt), 'dd/MM/yyyy')
    //     };
    //   },
    //   error: (error: any) => {
    //     console.log('error: ', error)
    //   }
    // });
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}.json`).subscribe({
      next: (data: any) => {
        // console.log(data);
      },
      error: (error: any) => {
        console.log('error: ', error)
      }
    });
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

  get listaSuinos() {
    return this.getSuinoAll().pipe(
      map(listaSuinos => {
        return listaSuinos.sort((a, b) => a.brincoAnimal - b.brincoAnimal);
      })
    );
  }

  get listaAtividades() {
    return this.getAtividadeAll().pipe(
      map(listaAtividades => {
        return listaAtividades.sort((a, b) => a.nome.localeCompare(b.nome));
      })
    );
  }

  novaSessaoAdicionada() {
    setTimeout(() => {
      this.novaSessaoSubject.next(this.novaSessao);
    }, 1000);
  }

  get novaSessaoObservable$() {
    return this.novaSessaoSubject.asObservable();
  }

  get sessaoAtualizada() {
    return this._sessaoAtualizada;
  }

}
