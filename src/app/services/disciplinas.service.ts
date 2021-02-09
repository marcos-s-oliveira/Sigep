import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {

  constructor(private http: HttpClient) { }
  
  listaDisciplinas() : Observable<any>{
    return this.http.get('http://localhost:3000/disciplinas')
  }
  getDisciplina(id): Observable<any>{
    return this.http.get('http://localhost:3000/disciplinas/'+id)
  }
}
