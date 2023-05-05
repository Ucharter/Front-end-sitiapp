import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CajeroComponent } from './components/cajero/cajero.component';
import { AdminComponent } from './components/admin/admin.component';
import { ListarUsuariosComponent } from './components/assets/listar-usuarios/listar-usuarios.component';
import { ListarClientesComponent } from './components/assets/listar-clientes/listar-clientes.component';
import { ListarProductosComponent } from './components/assets/listar-productos/listar-productos.component';
import { CrearProductosComponent } from './components/assets/crear-productos/crear-productos.component';
import { CrearUsuariosComponent } from './components/assets/crear-usuarios/crear-usuarios.component';
import { CrearClienteComponent } from './components/assets/crear-cliente/crear-cliente.component';

import { ToastrModule } from 'ngx-toastr'

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    HeaderComponent,
    FooterComponent,
    CajeroComponent,
    AdminComponent,
    ListarUsuariosComponent,
    ListarClientesComponent,
    ListarProductosComponent,
    CrearProductosComponent,
    CrearUsuariosComponent,
    CrearClienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
