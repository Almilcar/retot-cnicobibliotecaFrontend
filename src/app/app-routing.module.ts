import { RegistoUsuarioComponent } from './pages/registo-usuario/registo-usuario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroPrestamoComponent } from './pages/registro-prestamo/registro-prestamo.component';
import { RegistrClienteComponent } from './pages/registr-cliente/registr-cliente.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
   

  { path: '', component: RegistroPrestamoComponent },
  { path: 'prestamos', component: RegistroPrestamoComponent },
  { 
    path: 'clientes',
    component: RegistrClienteComponent,
  },
  { 
    path: 'usuarios',
    component: RegistoUsuarioComponent,
  }
];

 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
