import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestauranteService } from 'src/app/servicios/restaurante.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-ver-rest',
  templateUrl: './ver-rest.component.html',
  styleUrls: ['./ver-rest.component.css']
})
export class VerRestComponent implements OnInit {

  constructor(public servicio: RestauranteService, private router: Router) { }
  
  rest={};
  
  
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      let token=localStorage.getItem('token')!;
      this.servicio.obtenerRestaurantes(token).subscribe(
        res => {
          let restaurante=JSON.stringify(res);
          this.servicio.rest=JSON.parse(restaurante);
        },
        err => {
          console.log(err)
        }
      ) 
    }

    if(localStorage.getItem('rest')){
      localStorage.removeItem('rest');
    }
  }
 
  subir(id: string){
    this.servicio.cifrarId(id).subscribe(
    res=>{
      localStorage.setItem('rest', JSON.stringify(res));
    }
      )
  }

  borrar(){
    const id=localStorage.getItem('rest')!;
    this.servicio.borrarRest(id).subscribe(
    res=>{
      swal.fire({
        title: 'Restaurante borrado', 
        icon: 'success',
        width: 400,
       }).then(()=>{
        localStorage.removeItem('rest');
        this.ngOnInit();
       });
    }
      )
  }

  ordenar(categoria: string){
    if(categoria == 'nom_rest'){
      this.servicio.rest.sort(function (a:any, b:any){
        if (a.nom_rest > b.nom_rest) {
          return 1;
        }
        if (a.nom_rest < b.nom_rest) {
          return -1;
        }
        return 0;
      })
    }else if(categoria == 'nom_dueno'){
        this.servicio.rest.sort(function (a:any, b:any){
          if (a.nom_dueno > b.nom_dueno) {
            return 1;
          }
          if (a.nom_dueno < b.nom_dueno) {
            return -1;
          }
          return 0;
        })
    }else if(categoria == 'telefono'){
      this.servicio.rest.sort(function (a:any, b:any){
        return (b.telefono - a.telefono)
      })
    }else if(categoria == 'mesas'){
      this.servicio.rest.sort(function (a:any, b:any){
        return (b.mesas - a.mesas)
      })
    }else if(categoria == 'direccion'){
      this.servicio.rest.sort(function (a:any, b:any){
        if (a.direccion > b.direccion) {
          return 1;
        }
        if (a.direccion < b.direccion) {
          return -1;
        }
        return 0;
      })
    }
  }

}
