import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ UserModel } from '../../models/usuarioModel';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  URL = 'localhost:8090/usuarios';
  private usuario$ = new Subject<any>();

  constructor(private http: HttpClient) { }

  guardarUser(data: UserModel,tipo:String): Observable<any>{
    return this.http.post(this.URL+'/'+tipo,data);
  }
  listarUser():Observable <any> {
    return this.http.get(this.URL);
  }
  eliminarUser(id: string):any{
    return this.http.delete(this.URL+'/'+id);
  }
  addEditUser(usuario: UserModel){
    this.usuario$.next(usuario);
  }
  getUser():Observable<UserModel>{
    return this.usuario$.asObservable();
  }
  updateUser(id:string, data:UserModel): Observable<any>{
    return this.http.put(this.URL+'/'+id,data);
  }
}
