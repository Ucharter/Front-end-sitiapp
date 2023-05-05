import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ ProductoModel } from '../../models/productoModel';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {
  URL = 'localhost:8090/productos';
  private producto$ = new Subject<any>();

  constructor(private http: HttpClient) { }

  guardarProducto(data: ProductoModel): Observable<any>{
    return this.http.post(this.URL,data);
  }
  listarProducto():Observable <any> {
    return this.http.get(this.URL);
  }
  eliminarProducto(id: string):any{
    return this.http.delete(this.URL+'/'+id);
  }
  addEditProducto(usuario: ProductoModel){
    this.producto$.next(usuario);
  }
  getProducto():Observable<ProductoModel>{
    return this.producto$.asObservable();
  }
  updateProducto(id:string, data:ProductoModel): Observable<any>{
    return this.http.put(this.URL+'/'+id,data);
  }
}
