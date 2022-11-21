import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empleado } from 'src/app/descripciones/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  emp !: empleado[];

  url_api = 'http://localhost:4000/api/empleado';

  constructor(private http: HttpClient) { }

  aniadirEmp(form: FormData, token: string){
    return this.http.post(this.url_api + '/aniadir'+'/'+token, form);
  }

  obtenerEmpleados(token:string){
    return this.http.get(this.url_api + '/verEmps'+'/'+token);
  }
}
 