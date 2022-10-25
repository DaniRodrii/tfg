import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginUsuarioComponent } from './componentes/login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { PrincipalComponent } from './componentes/principal/principal.component';

const routes: Routes = [
  {path:'registroUser', component:RegistroUsuarioComponent},
  {path:'', component:PrincipalComponent},
  {path:'EditarUser', component:EditarUsuarioComponent},
  {path:'loginUser', component:LoginUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
