import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  user = {}

  constructor(public servicio: UsuarioService, private router: Router) { }

  ngOnInit(): void {  
    
  }

  loguearse(form : NgForm){
    this.servicio.login(form.value).subscribe(
      res => {
        localStorage.setItem('token', JSON.stringify(res));
        alert("Usuario logueado");
        this.router.navigate(['/']);
      },
      err => {
         console.error(err);
         alert("Error");
      }
    )
  }

}
