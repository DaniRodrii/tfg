import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { restaurante } from 'src/app/descripciones/restaurante';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  
  rest !: restaurante[];
  rest2 !: restaurante[];

 
  restaur: restaurante = {
    nom_rest: '',
    nom_dueno: '',
    telefono: 0,
    mesas: 0,
    direccion: '',
    id_user:'',
    _id:''
  }

  url_api = 'http://localhost:4000/api/restaurante';
  
  constructor(private http: HttpClient) { }

  aniadirRest(form: FormData, token: string) {
    return this.http.post(this.url_api + '/aniadir'+'/'+token, form);
  }

  obtenerRestaurantes(token:string){
    return this.http.get(this.url_api + '/verRests'+'/'+token);
  }

  cifrarId(token:string){
    return this.http.post(this.url_api + '/cifrar'+'/'+token, token);
  }

  borrarRest(token: string){
    return this.http.delete(this.url_api + '/'+token);
  }

  editarRest(token: string){
    return this.http.get(this.url_api + '/'+token);
  }

  editarRestauranteDatos(form: FormData, token: string){
    return this.http.put(this.url_api +'/'+token, form);
  }

  filtradoDireccion(datos: object, id:string){
    return this.http.post(this.url_api +'/filtrarDireccion/'+id, datos);
  } 

}


 