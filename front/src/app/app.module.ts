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

@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    LoginUsuarioComponent,
    EditarUsuarioComponent,
    AdminUsuariosComponent,
    PrincipalComponent,
    VerUserComponent
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
