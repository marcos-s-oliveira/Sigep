import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TurmasService {

  constructor(private http: HttpClient) { }
  
  listarTurmas() : Observable<any>{
    return this.http.get('http://localhost:3000/turmas')
  }
}
