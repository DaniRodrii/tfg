import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuario } from '../descripciones/usuario';
import { usuarioLog } from '../descripciones/usuarioLog';
import { editarUsuario } from '../descripciones/editarUsuario';

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

 
  usuario: usuario = {
    nom_compl: '',
    nom_user: '',
    edad: 0,
    correo: '',
    contrasena: '',
    imagen:''
  }

  editUsuario: editarUsuario = {
    nom_compl: '',
    nom_user: '',
    edad: 0
  }

  constructor(private http: HttpClient) { }

  registro(Usuario: usuario) {
    return this.http.post(this.url_api + '/registro', Usuario);
  }
  
  login(Usuario: usuarioLog) {
    return this.http.post(this.url_api + '/login', Usuario);
  }

  editar(token: string){
    return this.http.get(this.url_api + '/'+token);
  }

  logueado(){
    return !!localStorage.getItem('token');
  }

  borrarUser(token: string){
    return this.http.delete(this.url_api + '/'+token);
  }
 
  editarUsuario(EditarUser: editarUsuario, token: string){ 

    return this.http.put(this.url_api + '/'+token, EditarUser);
  }

  subidaImg(img: FormData, token: string){
    return this.http.post(this.url_api + '/subida'+"/"+token, img);
    
  } 
  

}
