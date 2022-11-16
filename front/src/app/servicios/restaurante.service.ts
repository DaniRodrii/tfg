import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  url_api = 'http://localhost:4000/api/restaurante';
  constructor(private http: HttpClient) { }

  aniadirRest(form: FormData, token: string) {
    return this.http.post(this.url_api + '/aniadir'+'/'+token, form);
  }

}
