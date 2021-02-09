import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChamadasService {

  constructor( private http: HttpClient ) { }
  salvarChamada(presentes) : Observable<any> {
    return this.http.post("http://localhost:3000/chamadas", presentes)
  }
}
