import { Component, OnInit,  Renderer2, ViewChild, ElementRef} from '@angular/core';
import { PedidosService } from '../../servicios/pedidos.service';
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: 'app-ver-pedidos',
  templateUrl: './ver-pedidos.component.html',
  styleUrls: ['./ver-pedidos.component.css']
})
export class VerPedidosComponent implements OnInit {

  constructor(public servicio: PedidosService, private router: Router, private renderer: Renderer2) { }
  disponible=false;
  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';

  opcionSeleccionado2: string  = '0';
  verSeleccion2: string        = '';

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this.cargar();
      this.cargarRest();
    }
  }

  cargar(){
    this.servicio.obtenerPedidos().subscribe(
      res=>{
        let pedidos=JSON.stringify(res);
          this.servicio.pedidos=JSON.parse(pedidos);
          this.disponible=true;
      },
      err=> {
        console.log(err)
        this.disponible=false;
      })
  }

  cargarRest(){
    this.servicio.cargarRestaurantes().subscribe(
      res=>{
        let datos=JSON.stringify(res);
        this.servicio.pedidos2=JSON.parse(datos);
        if(this.servicio.pedidos2.length<=0){
          swal.fire({
            title: 'No hay restaurantes añadidos',  
            icon: 'info',
            width: 400
           })
          
        }
      },
      err=> {
        console.log(err)
      }
    )
  }

  subir(id: any){
    sessionStorage.setItem('ped', id);
  }

  borrar(){
    let ped=sessionStorage.getItem('ped');
    this.servicio.borrarPedido(ped).subscribe(
      res => {
        swal.fire({
          title: 'Pedido borrado', 
          icon: 'success',
          width: 400,
         }).then(()=>{
          localStorage.removeItem('ped');
          this.ngOnInit();
         });
      }, 
      err => {
        console.log(err);
      }
    );
  }

  filtrar(){
    this.verSeleccion = this.opcionSeleccionado;
    if(this.verSeleccion != '0'){
      this.servicio.filtrado(this.verSeleccion).subscribe(
        res => {
          let pedidos=JSON.stringify(res);
          this.servicio.pedidos=JSON.parse(pedidos);
        }, 
        err => {
          console.log(err);
        }
      );
    }else{
      this.cargar();
    }
  }

  ordenar(){
    this.verSeleccion2 = this.opcionSeleccionado2;
    if(this.verSeleccion2 != '0'){
      if(this.verSeleccion2 == 'precio'){
       this.servicio.pedidos.sort(function (a:any, b:any){
          return (b.precio - a.precio)
        })
      }else{
        this.servicio.pedidos.sort(function (a:any, b:any){
          if (a.nom > b.nom) {
            return 1;
          }
          if (a.nom < b.nom) {
            return -1;
          }
          return 0;
        })
      }

    }else{
      this.cargar();
    }
    
  }

}
