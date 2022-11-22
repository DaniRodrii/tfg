import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stock } from '../descripciones/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  url_api = 'http://localhost:4000/api/stock';

  stock !: stock[];

  constructor(private http: HttpClient) { }


  aniadirStock(form: FormData, token: string){
    return this.http.post(this.url_api + '/aniadir'+'/'+token, form);
  }

  obtenerStock(token:string){
    return this.http.get(this.url_api + '/verProds'+'/'+token);
  }

  borrar(id: any){
    return this.http.delete(this.url_api + '/' +id);
  }

}
