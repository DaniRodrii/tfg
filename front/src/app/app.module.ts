import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';
import { LoginUsuarioComponent } from './componentes/login-usuario/login-usuario.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { AdminUsuariosComponent } from './componentes/admin-usuarios/admin-usuarios.component';
import { PrincipalComponent } from './componentes/principal/principal.component';


import { AuthGuard } from './auth.guard';
import { VerUserComponent } from './componentes/ver-user/ver-user.component';
import { RecuContraComponent } from './componentes/recu-contra/recu-contra.component';
import { AniadirRestComponent } from './componentes/aniadir-rest/aniadir-rest.component';
import { VerRestComponent } from './componentes/ver-rest/ver-rest.component';
import { EditarRestComponent } from './componentes/editar-rest/editar-rest.component';
import { VerEmpComponent } from './componentes/ver-emp/ver-emp.component';
import { EditarEmpComponent } from './componentes/editar-emp/editar-emp.component';
import { VerStockComponent } from './componentes/ver-stock/ver-stock.component';
import { AniadirStockComponent } from './componentes/aniadir-stock/aniadir-stock.component';
import { EditarStockComponent } from './componentes/editar-stock/editar-stock.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    LoginUsuarioComponent,
    EditarUsuarioComponent,
    AdminUsuariosComponent,
    PrincipalComponent,
    VerUserComponent,
    RecuContraComponent,
    AniadirRestComponent,
    VerRestComponent,
    EditarRestComponent,
    VerEmpComponent,
    EditarEmpComponent,
    VerStockComponent,
    AniadirStockComponent,
    EditarStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
