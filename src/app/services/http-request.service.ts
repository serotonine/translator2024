import { Injectable, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
// Models.
import { type Term, type Choose } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  private _httpClient = inject(HttpClient);
  private _baseUrl = 'https://serotonine.alwaysdata.net/restapi/restAPI.php';
  private _url =
    'https://serotonine.alwaysdata.net/restapi/restAPI.php?request=name/1/7';
  /* constructor() { } */
  // GET.
  getList(type: string | null | undefined, date: string | null) {
    const options = {
      params: new HttpParams().set('request', `${type}/1/${date}`),
    };
    return this._httpClient
      .get<[]>(this._baseUrl, options)
      .pipe(catchError((error) => throwError(() => new Error(error.message))));
  }
  // UPDATE.
  updateList(type: string, id: number, options: {}) {
    const _options = Object.values(options).filter((value) => typeof value ==='string' && value.length >=1 ).join('/');
    console.log(_options);
    
    return this._httpClient
      // $type,$id, $user,$fr,$nl,$perf=null,$imperf=null
      .put(`https://serotonine.alwaysdata.net/restapi/${type}/1/${id}/${_options}`, {
        observe: 'response',
      })
      .pipe(catchError((error) => throwError(() => new Error(error.message))));
  }

  // DELETE.
  delete(type: string, id: number) {
    const options = {
      params: new HttpParams().set('request', `${type}/1/${id}`),
    };
    return this._httpClient
      .delete(this._baseUrl, options)
      .pipe(catchError((error) => throwError(() => new Error(error.message))));
  }
}
