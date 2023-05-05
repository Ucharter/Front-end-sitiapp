import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductoModel } from 'src/app/models/productoModel';
import { ProductoServiceService } from 'src/app/services/producto/producto-service.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent {
  listaProducto:ProductoModel []=[];

  constructor(private _productoService: ProductoServiceService, private toast: ToastrService){}
  ngOnInit(): void {
    this.listarProducto();
  }

  listarProducto(){
    this._productoService.listarProducto().subscribe(res=>{
      console.log(res)
      this.listaProducto=[];
      res.forEach((element:any) => {
        this.listaProducto.push({
          ID:element.ID,
          ...element
        })
      });
    })
  }
  eliminarProducto(id:any){
    this._productoService.eliminarProducto(id).then(()=>{
      this.toast.success('Producto borrado','EXITO')
    }).catch(()=>{
      this.toast.error('Producto no borrada','ERROR')
    });
  }
  EditarProducto(data:ProductoModel){
    this._productoService.addEditProducto(data);
  }

}
