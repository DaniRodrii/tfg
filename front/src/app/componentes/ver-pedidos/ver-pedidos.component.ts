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

  // @ViewChild('table') table!: ElementRef;

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this.cargar();
    }
  }

  cargar(){
    this.servicio.obtenerPedidos().subscribe(
      res=>{
        let empleados=JSON.stringify(res);
          this.servicio.pedidos=JSON.parse(empleados);
          this.disponible=true;
      },
      err=> {
        console.log(err)
        this.disponible=false;
      })
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

}
