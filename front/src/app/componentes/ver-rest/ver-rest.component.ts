import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestauranteService } from 'src/app/servicios/restaurante.service';

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
  }


 
}
