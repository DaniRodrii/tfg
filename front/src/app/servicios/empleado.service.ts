import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empleado } from 'src/app/descripciones/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  emp !: empleado[];

  empleado: empleado = {
    nom_emp: '',
    edad: 0,
    telefono: 0,
    cargo: '',
    sexo: '',
    id_rest:'',
    _id:'',
    DNI: ''
  }

  url_api = 'http://localhost:4000/api/empleado';

  constructor(private http: HttpClient) { }

  aniadirEmp(form: FormData, token: string){
    return this.http.post(this.url_api + '/aniadir'+'/'+token, form);
  }

  obtenerEmpleados(token:string){
    return this.http.get(this.url_api + '/verEmps'+'/'+token);
  }

  obtenerTodosEmpleados(token:string){
    return this.http.get(this.url_api +'/verTodos'+'/'+token);
  }

  obtenerEmpleado(token:string){
    return this.http.get(this.url_api +'/'+token);
  }

  cifrarId(token:string){
    return this.http.post(this.url_api + '/cifrar'+'/'+token, token);
  }

  borrarEmp(token: string){
    return this.http.delete(this.url_api + '/'+token);
  }

  editarEmpleado(form: FormData, token: string){
    return this.http.put(this.url_api +'/'+token, form);
  }

  buscarDNI(form: FormData, token: string){
    return this.http.put(this.url_api +'/filtrarDNI'+token, form);
  }
}
 