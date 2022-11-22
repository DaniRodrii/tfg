import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginUsuarioComponent } from './componentes/login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { AuthGuard } from './auth.guard';
import { VerUserComponent } from './componentes/ver-user/ver-user.component';
import { RecuContraComponent } from './componentes/recu-contra/recu-contra.component';
import { AniadirRestComponent } from './componentes/aniadir-rest/aniadir-rest.component';
import { VerRestComponent } from './componentes/ver-rest/ver-rest.component';
import { EditarRestComponent } from './componentes/editar-rest/editar-rest.component';
import { VerEmpComponent } from './componentes/ver-emp/ver-emp.component';
import { EditarEmpComponent } from './componentes/editar-emp/editar-emp.component';
import { AniadirStockComponent } from './componentes/aniadir-stock/aniadir-stock.component';
import { EditarStockComponent } from './componentes/editar-stock/editar-stock.component';
import { VerStockComponent } from './componentes/ver-stock/ver-stock.component';

const routes: Routes = [
  {path:'registroUser', component:RegistroUsuarioComponent},
  {path:'', component:PrincipalComponent, canActivate: [AuthGuard] },
  {path:'EditarUser', component:EditarUsuarioComponent, canActivate: [AuthGuard]},
  {path:'loginUser', component:LoginUsuarioComponent},
  {path:'editarUser', component:EditarUsuarioComponent, canActivate: [AuthGuard]},
  {path:'verUser', component:VerUserComponent,  canActivate: [AuthGuard]},
  {path:'recuperarContraseña', component:RecuContraComponent},
  {path:'verRestaurante', component:VerRestComponent, canActivate: [AuthGuard]},
  {path:'editarRest', component:EditarRestComponent, canActivate: [AuthGuard]},
  {path:'aniadirRest', component:AniadirRestComponent, canActivate: [AuthGuard]},
  {path:'verEmp', component:VerEmpComponent, canActivate: [AuthGuard]},
  {path:'editarEmp', component:EditarEmpComponent, canActivate: [AuthGuard]},
  {path:'verStock', component:VerStockComponent, canActivate: [AuthGuard]},
  {path:'editarStock', component:EditarStockComponent, canActivate: [AuthGuard]},
  {path:'aniadirStock', component:AniadirStockComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
