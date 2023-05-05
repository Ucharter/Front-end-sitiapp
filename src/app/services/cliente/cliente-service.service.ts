import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ ClienteModel } from '../../models/clienteModel';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  URL = 'localhost:8090/clientes';
  private cliente$ = new Subject<any>();

  constructor(private http: HttpClient) { }

  guardarCliente(data: ClienteModel,tipo:String): Observable<any>{
    return this.http.post(this.URL+'/'+tipo,data);
  }
  listarCliente():Observable <any> {
    return this.http.get(this.URL);
  }
  eliminarCLiente(id: string):any{
    return this.http.delete(this.URL+'/'+id);
  }
  addEditCliente(usuario: ClienteModel){
    this.cliente$.next(usuario);
  }
  getCliente():Observable<ClienteModel>{
    return this.cliente$.asObservable();
  }
  updateCliente(id:string, data:ClienteModel): Observable<any>{
    return this.http.put(this.URL+'/'+id,data);
  }

}
