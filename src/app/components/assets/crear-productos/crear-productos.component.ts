import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductoModel } from 'src/app/models/productoModel';
import { ProductoServiceService } from 'src/app/services/producto/producto-service.service';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent {
  
  forms: FormGroup;
  loading: boolean=false;
  titulo ='Crear Producto';
  id: string | undefined;

  constructor(private fb:FormBuilder, private _productoService: ProductoServiceService, private toastr: ToastrService){
    this.forms= this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(2), Validators.maxLength(100)]],
      estado:['',[Validators.required,Validators.minLength(2), Validators.maxLength(45)]],
      valor_unitario:['',[Validators.required, Validators.minLength(1)]],
    })
  }
  
  ngOnInit(): void {
    this._productoService.getProducto().subscribe(res=>{
      this.titulo='Editar Producto'
      this.id=res.ID;
      this.forms.patchValue({
      nombre:res.nombre,
      estado:res.estado,
      valorUnitario:res.valorUnitario,
      })
    })
  }
  guardarProducto(){
    if(this.id === undefined){
      this.crearProducto();
    }else{
      this.updateProducto(this.id);
    }
  }
  updateProducto(id:string){
    this.loading=true;
    const PRODUCTO : any ={
      nombre: this.forms.value.nombre,
      estado: this.forms.value.estado,
      valor_unitario:this.forms.value.valor_unitario
    }
    this._productoService.updateProducto(id,PRODUCTO).pipe(
      catchError(error => {
        this.loading=false;
        this.toastr.error('no se guardaron los datos','ERROR')
        return throwError('Se produjo un error en el observable');
      })
    ).subscribe(result => {
      this.toastr.info('PRODUCTO Editado','EXITO')
      this.loading=false;
      this.forms.reset();
      this.titulo='Crear Producto';
      this.id=undefined
    });
  }
  crearProducto(){
    this.loading=true;
    console.log("datos guardados", this.forms);
    const PRODUCTO : ProductoModel ={
      nombre: this.forms.value.nombre,
      estado: this.forms.value.estado,
      valorUnitario:this.forms.value.valor_unitario
    }

    this._productoService.guardarProducto(PRODUCTO).pipe(
      catchError(error => {
        this.loading=false;
        this.toastr.error('no se guardaron los datos','ERROR')
        return throwError('Se produjo un error en el observable');
      })
    ).subscribe(()=>{
      this.toastr.success('Producto registrado','EXITO')
      this.loading=false;
      this.forms.reset();
    })
  }

}
