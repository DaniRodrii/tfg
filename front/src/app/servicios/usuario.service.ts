import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuario } from '../descripciones/usuario';
import { usuarioLog } from '../descripciones/usuarioLog';
import { token } from '../descripciones/token';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url_api = 'http://localhost:4000/api/usuarios';

  usuarioRegister: usuario = {
    nom_compl: '',
    nom_user: '',
    edad: 0,
    correo: '',
    contrasena: '',
    imagen:'fotoperfil.png'
  };

  usuarioLogin: usuarioLog = {
    correo: '',
    contrasena: ''
  };

  tokenEnv : token={
    tokenCif: ''
  }
 
  usuario: usuario = {
    nom_compl: '',
    nom_user: '',
    edad: 0,
    correo: '',
    contrasena: '',
    imagen:'fotoperfil.png'
  }

  constructor(private http: HttpClient) { }

  registro(Usuario: usuario) {
    return this.http.post(this.url_api + '/registro', Usuario);
  }
  
  login(Usuario: usuarioLog) {
    return this.http.post(this.url_api + '/login', Usuario);
  }

  editar(tokenEnv: token){
    return this.http.post(this.url_api + '/perfil', tokenEnv);
  }

  logueado(){
    return !!localStorage.getItem('token');
  }

  borrarUser(token: string){
    return this.http.delete(this.url_api + '/'+token);
  
  }

}
