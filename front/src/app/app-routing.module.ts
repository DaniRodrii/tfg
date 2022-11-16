import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginUsuarioComponent } from './componentes/login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { AuthGuard } from './auth.guard';
import { VerUserComponent } from './componentes/ver-user/ver-user.component';
import { RecuContraComponent } from './componentes/recu-contra/recu-contra.component';

const routes: Routes = [
  {path:'registroUser', component:RegistroUsuarioComponent},
  {path:'', component:PrincipalComponent, canActivate: [AuthGuard] },
  {path:'EditarUser', component:EditarUsuarioComponent, canActivate: [AuthGuard]},
  {path:'loginUser', component:LoginUsuarioComponent},
  {path:'editarUser', component:EditarUsuarioComponent, canActivate: [AuthGuard]},
  {path:'verUser', component:VerUserComponent, canActivate: [AuthGuard]},
  {path:'recuperarContraseña', component:RecuContraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
