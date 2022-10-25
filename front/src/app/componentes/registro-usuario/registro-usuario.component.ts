import { Component, OnInit } from '@angular/core';
import { UsuarioService} from '../../servicios/usuario.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  usuario={}

  constructor(public servicio: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  
  registrarse(form: NgForm){
    this.servicio.registro(form.value).subscribe(
      res => {
        localStorage.setItem('token', JSON.stringify(res));
        alert("Usuario registrado");
        this.router.navigate(['/']);
      },
      err => {
        console.error(err);
        alert("Error");
      }
    )
  }

}
