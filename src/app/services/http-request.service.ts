import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, inject, signal } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { type Term, type Choose } from '../models/list.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private _currentList = signal<Term[]>([]);
  private _httpClient = inject(HttpClient);
  private _baseUrl = "https://serotonine.alwaysdata.net/restapi/restAPI.php";
  private _url = "https://serotonine.alwaysdata.net/restapi/restAPI.php?request=name/1/7";
  /* constructor() { }

  
  sayHello(){
    return this._httpClient.get<[]>(this._url)
  }*/
  getList(type:string| null| undefined, date:string|null){
    const options = { params: new HttpParams().set('request', `${type}/1/${date}`) }
    return this._httpClient.get<[]>(this._baseUrl, options).pipe(
      catchError((error) =>
        throwError(() => new Error(error.message))
      )
    );
  }
  get currentList(){
    return this._currentList();
  }
}
