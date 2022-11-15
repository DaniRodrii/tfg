import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  user = {}

  constructor(public servicio: UsuarioService, private router: Router, private fb: FormBuilder) { }
  public loginForm!: FormGroup;
  ngOnInit(): void {  
    this.loginForm = this.fb.group({
      correo:[' ', [
        Validators.required,
        Validators.email
      ]],
      contrasena:[' ', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18)
      ]]
    })
  }

  loguearse(){
    this.servicio.login(this.loginForm.value).subscribe(
      res => {
        localStorage.setItem('token', JSON.stringify(res));
        alert("Usuario logueado");
        this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
      },
      err => {
         console.error(err);
         alert("Error");
      }
    )
  }

}
