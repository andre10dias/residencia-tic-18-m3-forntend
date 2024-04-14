import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

@Injectable()
export class FormService {
  baseUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) { }

  getFirst() {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(data => {
        return data[0];
      })
    );
  }
  
}
