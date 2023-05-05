import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LogInServiceService {

  constructor(private http: HttpClient) { }
  
  getUser(nombreusuario:string): Observable<any>{
    const URL = 'localhost:8090/login/'+nombreusuario;
    return this.http.get(URL);
  }


}
