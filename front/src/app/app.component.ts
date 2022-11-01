import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './servicios/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuario={};

  constructor(public servicio: UsuarioService,private router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      const token=localStorage.getItem('token')!;
      this.servicio.editar(token).subscribe(
        res => {
          let user=JSON.stringify(res);
          this.servicio.usuario=JSON.parse(user);
        },
        err => {
           console.error(err);
           alert("Error");
        }
      )

    }
  }
}  
