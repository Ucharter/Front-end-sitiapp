import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClienteModel } from 'src/app/models/clienteModel'
import { ClienteServiceService } from 'src/app/services/cliente/cliente-service.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent {
  
  tipoIdentificacion:string='cc';

  ListaIdentificacion:any[]=[
    {value:'1', nombre: 'cedula'},
    {value:'2', nombre: 'Tarjeta'}
  ];

  tipoEstado:string='s';

  ListaEstado:any[]=[
    {value:'s', nombre: 'Soltero'},
    {value:'c', nombre: 'casado'}
  ];

  forms: FormGroup;
  loading: boolean=false;
  titulo ='Crear Cliente';
  id: string | undefined;

  constructor(private fb:FormBuilder, private _clienteService: ClienteServiceService, private toastr: ToastrService){
    this.forms= this.fb.group({
      identificacion:['',[Validators.required,Validators.minLength(10), Validators.maxLength(100)]],
      razon_social:['',[Validators.required, Validators.maxLength(100)]],
      estado:['',[Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
      tipo_identificacion:['',[Validators.required, Validators.minLength(2), Validators.minLength(2)]],
    })
  }
  
  ngOnInit(): void {
    this._clienteService.getCliente().subscribe(res=>{
      this.titulo='editar cliente'
      this.id=res.cliente;
      this.forms.patchValue({
      identificacion:res.identificacion,
      razonSocial:res.razonSocial,
      estado:res.estado,
      })
    })
  }
  guardarCliente(){
    if(this.id === undefined){
      this.crearCliente();
    }else{
      this.updateCliente(this.id);
    }
  }
  updateCliente(id:string){
    this.loading=true;
    const CLIENTE : any ={
      identificacion:this.forms.value.identificacion,
      razon_social:this.forms.value.razon_social,
      estado:this.forms.value.estado,
      tipo_identificacion:this.forms.value.tipo_identificacion
    }
    this._clienteService.updateCliente(id,CLIENTE).pipe(
      catchError(error => {
        this.loading=false;
        this.toastr.error('no se guardaron los datos','ERROR')
        return throwError('Se produjo un error en el observable');
      })
    ).subscribe(result => {
      this.toastr.info('Cliente Editado','EXITO')
      this.loading=false;
      this.forms.reset();
      this.titulo='Crear Cliente';
      this.id=undefined
    });
  }
  crearCliente(){
    this.loading=true;
    console.log("datos guardados", this.forms);
    const CLIENTE : ClienteModel ={
      identificacion:this.forms.value.identificacion,
      razonSocial:this.forms.value.razon_social,
      estado:this.forms.value.estado,
      fechaRegistro:new Date()
    }

    this._clienteService.guardarCliente(CLIENTE,this.forms.value.tipo_identificacion).pipe(
      catchError(error => {
        this.loading=false;
        this.toastr.error('no se guardaron los datos','ERROR')
        return throwError('Se produjo un error en el observable');
      })
    ).subscribe(()=>{
      this.toastr.success('Cliente registrado','EXITO')
      this.loading=false;
      this.forms.reset();
    })
  }

}
