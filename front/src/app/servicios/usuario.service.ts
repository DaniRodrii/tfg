import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuario } from '../descripciones/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url_api_register = 'http://localhost:4000/api/usuarios/registro';

  usuarioRegister: usuario = {
    nom_compl: '',
    nom_user: '',
    edad: 0,
    correo: '',
    contrasena: ''
  };

  constructor(private http: HttpClient) { }

  registro(Usuario: usuario) {
    return this.http.post(this.url_api_register, Usuario);
  }

}
