import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  constructor( private http: HttpClient ) { }
  listaAlunosChamada(turma): Observable<any>{
    return this.http.get('http://localhost:3000/alunos/?turmaId='+turma)
  }
}
