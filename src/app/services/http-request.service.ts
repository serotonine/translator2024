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
  // TODO remove request and params : restAPI.php?request=name/1/7
  private _baseUrl = 'https://serotonine.alwaysdata.net/restapi/restAPI.php';
  //TODO: Delete.
  private _url =
    'https://serotonine.alwaysdata.net/restapi/restAPI.php?request=name/1/7';

  // GET.
  getList(type: string | null | undefined, date: string | null) {
    const options = {
      params: new HttpParams().set('request', `${type}/1/${date}`),
    };
    return this._httpClient
      .get<[]>(this._baseUrl, options)
      .pipe(catchError((error) => throwError(() => new Error(error.message))));
  }
  // POST.
    // $type, $user,$fr,$nl,$perf=null,$imperf=null
  addTerm(type: string, options:{}){
    const _options = Object.values(options).filter((value) => typeof value ==='string' && value.length >=1 ).join('/');
    return this._httpClient
      .post(`https://serotonine.alwaysdata.net/restapi/restAPI.php?request=${type}/1/null/${_options}`,_options)
      .pipe(
        map((resp) => Object.values(resp)[0]),
        catchError((error) => throwError(() => new Error(error.message))));
  }
  // UPDATE.
  updateList(type: string, id: number, options: {}) {
    const _options = Object.values(options).filter((value) => typeof value ==='string' && value.length >=1 ).join('/');
    
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
