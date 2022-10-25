import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuario } from '../descripciones/usuario';
import { usuarioLog } from '../descripciones/usuarioLog';

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

  constructor(private http: HttpClient) { }

  registro(Usuario: usuario) {
    return this.http.post(this.url_api + '/registro', Usuario);
  }
  
  login(Usuario: usuarioLog) {
    return this.http.post(this.url_api + '/login', Usuario);
  }

}
