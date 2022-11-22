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
}
