import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/usuarioModel';
import { UserServiceService } from 'src/app/services/usuario/user-service.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent {
  listaUsers:UserModel []=[];

  constructor(private _userService: UserServiceService, private toast: ToastrService){}
  ngOnInit(): void {
    this.listarUser();
  }

  listarUser(){
    this._userService.listarUser().subscribe(res=>{
      console.log(res)
      this.listaUsers=[];
      res.forEach((element:any) => {
        this.listaUsers.push({
          id_usuario:element.id_usuario,
          ...element
        })
      });
    })
  }
  EliminarUser(id:any){
    this._userService.eliminarUser(id).then(()=>{
      this.toast.success('Tarjeta borrada','EXITO')
    }).catch(()=>{
      this.toast.error('Tarjeta no borrada','ERROR')
    });
  }
  EditarUser(tarjeta:UserModel){
    this._userService.addEditUser(tarjeta);
  }

}
