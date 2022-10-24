import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginUsuarioComponent } from './componentes/login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';

const routes: Routes = [
  //{path:'', redirectTo:'/loginUserloginUser', pathMatch: 'full'},
  {path:'registroUser', component:RegistroUsuarioComponent},
  {path:'loginUser', component:LoginUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
