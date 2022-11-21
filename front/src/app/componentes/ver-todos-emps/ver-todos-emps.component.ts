import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-ver-todos-emps',
  templateUrl: './ver-todos-emps.component.html',
  styleUrls: ['./ver-todos-emps.component.css']
})
export class VerTodosEmpsComponent implements OnInit {

  constructor(public servicio: EmpleadoService, private router: Router) { }
  tituloAlerta: string = '';
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      let token=localStorage.getItem('token')!;
      this.servicio.obtenerTodosEmpleados(token).subscribe(
        res => {
          let empleados=JSON.stringify(res);
          this.servicio.emp=JSON.parse(empleados);
        },
        err => {
          console.log(err)
        }
      ) 
    }
  }

}
