import { Component, OnInit } from '@angular/core';
import { StockService } from '../../servicios/stock.service';
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: 'app-ver-stock',
  templateUrl: './ver-stock.component.html',
  styleUrls: ['./ver-stock.component.css']
})
export class VerStockComponent implements OnInit {

  constructor(public servicio: StockService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') && localStorage.getItem('rest')){
      this.cargar();
    }else{
      this.router.navigate(['verRestaurante']);
    }

    if(sessionStorage.getItem('stock')){
      sessionStorage.removeItem('stock');
    }
    
  }

  cargar(){
    let token=localStorage.getItem('rest')!;
      this.servicio.obtenerStock(token).subscribe(
        res => {
          let empleados=JSON.stringify(res);
          this.servicio.stock=JSON.parse(empleados);
        },
        err => {
          console.log(err)
        }
      ) 
  }

  subir(id: any){

    sessionStorage.setItem('stock', id)
  }

  borrar(id:any){
    this.servicio.borrar(id).subscribe(
      res => {
        swal.fire({
          title: 'Producto borrado', 
          icon: 'success',
          width: 400,
         }).then(()=>{
            this.ngOnInit();
         });
      },
      err => {
        console.log(err)
      }
    ) 
  }


  ordenar(categoria: string){
    if(categoria == 'nom'){
        this.servicio.stock.sort(function (a:any, b:any){
          if (a.nom_prod > b.nom_prod) {
            return 1;
          }
          if (a.nom_prod < b.nom_prod) {
            return -1;
          }
          return 0;
        })
    }else if(categoria == 'cantidad'){
      this.servicio.stock.sort(function (a:any, b:any){
        return (b.cantidad - a.cantidad)
      })
    }else if(categoria == 'coste_total'){
      this.servicio.stock.sort(function (a:any, b:any){
        return (b.coste_total - a.coste_total)
      })
    }else if(categoria == 'estado'){
      this.servicio.stock.sort(function (a:any, b:any){
        if (a.estado > b.estado) {
          return 1;
        }
        if (a.estado < b.estado) {
          return -1;
        }
        return 0;
      })
    }
  }

}
