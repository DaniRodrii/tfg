import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { restaurante } from 'src/app/descripciones/restaurante';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  rest !: restaurante[];

  url_api = 'http://localhost:4000/api/restaurante';
  constructor(private http: HttpClient) { }

  aniadirRest(form: FormData, token: string) {
    return this.http.post(this.url_api + '/aniadir'+'/'+token, form);
  }

  obtenerRestaurantes(token:string){
    return this.http.get(this.url_api + '/verRests'+'/'+token);
  }


}
