import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';
import { LoginUsuarioComponent } from './componentes/login-usuario/login-usuario.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { VerUsuarioComponent } from './componentes/ver-usuario/ver-usuario.component';
import { AdminUsuariosComponent } from './componentes/admin-usuarios/admin-usuarios.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    LoginUsuarioComponent,
    EditarUsuarioComponent,
    VerUsuarioComponent,
    AdminUsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
