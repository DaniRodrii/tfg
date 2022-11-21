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

 
}
