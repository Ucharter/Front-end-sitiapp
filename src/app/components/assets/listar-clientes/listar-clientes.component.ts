import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClienteModel } from 'src/app/models/clienteModel';
import { ClienteServiceService } from 'src/app/services/cliente/cliente-service.service';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent {
  listaClientes:ClienteModel []=[];

  constructor(private _clienteService: ClienteServiceService, private toast: ToastrService){}
  ngOnInit(): void {
    this.listarCliente();
  }

  listarCliente(){
    this._clienteService.listarCliente().subscribe(res=>{
      console.log(res)
      this.listaClientes=[];
      res.forEach((element:any) => {
        this.listaClientes.push({
          cliente:element.cliente,
          ...element
        })
      });
    })
  }
  EliminarCliente(id:any){
    this._clienteService.eliminarCLiente(id).then(()=>{
      this.toast.success('Tarjeta borrada','EXITO')
    }).catch(()=>{
      this.toast.error('Tarjeta no borrada','ERROR')
    });
  }
  EditarCliente(tarjeta:ClienteModel){
    this._clienteService.addEditCliente(tarjeta);
  }
}
