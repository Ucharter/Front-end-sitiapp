import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserModel } from 'src/app/models/usuarioModel';
import { UserServiceService } from 'src/app/services/usuario/user-service.service';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent {

  perfilSeleccionado:string='1';

  Perfiles:any[]=[
    {value:'1', nombre: 'Admin'},
    {value:'2', nombre: 'Cajero'}
  ];

  forms: FormGroup;
  loading: boolean=false;
  titulo ='Crear Usuarios';
  id: string | undefined;

  constructor(private fb:FormBuilder, private _userService: UserServiceService, private toastr: ToastrService){
    this.forms= this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(2), Validators.maxLength(45)]],
      apellido:['',[Validators.required,Validators.minLength(2), Validators.maxLength(45)]],
      usuario:['',[Validators.required, Validators.minLength(5), Validators.maxLength(45)]],
      contrasena:['',[Validators.required, Validators.minLength(6), Validators.maxLength(45)]],
      id_perfil:['',[Validators.required, Validators.minLength(1)]],
    })
  }
  
  ngOnInit(): void {
    this._userService.getUser().subscribe(res=>{
      this.titulo='editar usuario'
      this.id=res.id_usuario;
      this.forms.patchValue({
      nombre:res.nombre,
      apellido:res.apellido,
      usuario:res.usuario,
      contrasena: res.contrasena
      })
    })
  }
  guardarUser(){
    if(this.id === undefined){
      this.crearUser();
    }else{
      this.updateUser(this.id);
    }
  }
  updateUser(id:string){
    this.loading=true;
    const USUARIO : any ={
      nombre: this.forms.value.nombre,
      apellido: this.forms.value.apellido,
      usuario:this.forms.value.usuario,
      contrasena: this.forms.value.contrasena,
    }
    this._userService.updateUser(id,USUARIO).pipe(
      catchError(error => {
        this.loading=false;
        this.toastr.error('no se guardaron los datos','ERROR')
        return throwError('Se produjo un error en el observable');
      })
    ).subscribe(result => {
      this.toastr.info('Usuario Editado','EXITO')
      this.loading=false;
      this.forms.reset();
      this.titulo='Crear User';
      this.id=undefined
    });
  }
  crearUser(){
    this.loading=true;
    console.log("datos guardados", this.forms);
    const USUARIO : UserModel ={
      nombre: this.forms.value.nombre,
      apellido: this.forms.value.apellido,
      usuario:this.forms.value.usuario,
      contrasena: this.forms.value.contrasena
    }

    this._userService.guardarUser(USUARIO,this.forms.value.id_perfil).pipe(
      catchError(error => {
        this.loading=false;
        this.toastr.error('no se guardaron los datos','ERROR')
        return throwError('Se produjo un error en el observable');
      })
    ).subscribe(()=>{
      this.toastr.success('Tarjeta registrada','EXITO')
      this.loading=false;
      this.forms.reset();
    })
  }

}
