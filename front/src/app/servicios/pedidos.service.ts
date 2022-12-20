import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pedidos } from 'src/app/descripciones/pedidos';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  
  url_api = 'http://localhost:4000/api/pedidos';

  pedidos !: pedidos[];
  pedidos2 !: pedidos[];

  ped: pedidos = {
    nom_rest:'',
    nom: '',
    descripcion: '',
    precio: 0,
    direccion: '',
    ciudad: '',
    _id: ''
  }

 

  constructor(private http: HttpClient) { }

  cargarRestaurantes(id: any){
    return this.http.get(this.url_api + '/verRests/'+id);
  }

  aniadirPedido(form : FormData, token: string){
    return this.http.post(this.url_api + '/aniadir/'+token, form);
  }

  obtenerPedidos(id: any){
    return this.http.get(this.url_api +'/verPedidos/'+id);
  }

  borrarPedido(id: any){
    return this.http.delete(this.url_api +'/'+id);
  }

  editarPedido(form: FormData, id: any){
    return this.http.put(this.url_api +'/'+id, form);
  }

  verPedido(id: any){
    return this.http.get(this.url_api + '/'+id);
  }

  filtrado(nom: string){
    return this.http.get(this.url_api + '/filtrado/'+nom);
  }
  
}
 