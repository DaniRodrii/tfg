import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-ver-user',
  templateUrl: './ver-user.component.html',
  styleUrls: ['./ver-user.component.css']
})
export class VerUserComponent implements OnInit {

  usuario={};

  constructor(public servicio: UsuarioService,private router : Router, private renderer: Renderer2) { }

  ngOnInit(): void {
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

  cerrarSesion(){
      localStorage.removeItem('token');
      this.router.navigate(['loginUser']);

  }
 
  borrarUsuario(){
      const token=localStorage.getItem('token')!;
        this.servicio.borrarUser(token).subscribe(
          res => {
            alert("Usuario borrado")
            localStorage.removeItem('token');
            this.router.navigate(['loginUser']);
          },
          err => {
             console.error(err);
             alert("Error");
          }
        )
        
  }

}
