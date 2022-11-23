import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stock } from '../descripciones/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  url_api = 'http://localhost:4000/api/stock';

  stock !: stock[];

  prod : stock = {
    nom_rest:'',
    nom_prod: '',
    _id: '',
    cantidad: 0,
    coste_total:0,
    estado: ''
  }

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

  editarStockDatos(form: FormData, token: string){
    return this.http.put(this.url_api +'/'+token, form);
  }

  obtenerProd(id: any){
    return this.http.get(this.url_api +'/'+id);
  }

}
