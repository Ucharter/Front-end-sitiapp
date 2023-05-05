import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { CajeroComponent } from './components/cajero/cajero.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'cajero', component: CajeroComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
