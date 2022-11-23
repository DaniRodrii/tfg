import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-ver-user',
  templateUrl: './ver-user.component.html',
  styleUrls: ['./ver-user.component.css']
})
export class VerUserComponent implements OnInit {

  usuario={};

  constructor(public servicio: UsuarioService,private router : Router, private renderer: Renderer2) { }

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
        }
      )
    }
  }

  cerrarSesion(){
      localStorage.clear();
      this.router.navigate(['loginUser']);

  }
 
  borrarUsuario(){
      const token=localStorage.getItem('token')!;
        this.servicio.borrarUser(token).subscribe(
          res => {
            swal.fire({
              title: 'Usuario borrado', 
              icon: 'success',
              width: 400,
             }).then(()=>{
              localStorage.removeItem('token');
              this.router.navigate(['loginUser']);
             });
          },
          err => {
             console.error(err);
             
          }
        )
        
  }

}
