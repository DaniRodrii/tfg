import { Component, OnInit } from '@angular/core';
import { UsuarioService} from '../../servicios/usuario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  usuario={}

  constructor(public servicio: UsuarioService) { }

  ngOnInit(): void {
  }

  
  registrarse(form: NgForm){
    this.servicio.registro(form.value).subscribe(
      res => {
        localStorage.setItem('token', JSON.stringify(res));
        alert("Usuario registrado");
      },
      err => {
        console.error(err);
        alert("Error");
      }
    )
  }

}
