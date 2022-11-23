import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pedidos } from 'src/app/descripciones/pedidos';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  
  url_api = 'http://localhost:4000/api/pedidos';

  pedidos !: pedidos[];

  constructor(private http: HttpClient) { }

  cargarRestaurantes(){
    return this.http.get(this.url_api + '/verRests');
  }

  aniadirPedido(form : FormData){
    return this.http.post(this.url_api + '/aniadir', form);
  }

  obtenerPedidos(){
    return this.http.get(this.url_api +'/verPedidos');
  }

  borrarPedido(id: any){
    return this.http.delete(this.url_api +'/'+id);
  }
}
 