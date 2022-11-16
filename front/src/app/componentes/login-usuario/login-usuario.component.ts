import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import swal from'sweetalert2';


@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  user = {}

  constructor(public servicio: UsuarioService, private router: Router, private fb: FormBuilder) { }
  public loginForm!: FormGroup;
  public recuForm!: FormGroup;
  tituloAlerta: string = '';
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

    this.recuForm = this.fb.group({
      correoRecu:[' ', [
        Validators.required,
        Validators.email
      ]]
    })
  }

  loguearse(){
    this.servicio.login(this.loginForm.value).subscribe(
      res => {
        localStorage.setItem('token', JSON.stringify(res));
        this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
      }, 
      err => {
        console.log(err.error.message)
        this.tituloAlerta=JSON.stringify(err.error.message);
        let alerta=this.tituloAlerta.replace(/['"]+/g, '');
         swal.fire({
          title: 'Error',  
          text: alerta,  
          icon: 'error',
          width: 400,
          background:'#ffbdb9'
         });
      }
    )
  }

  recuperar(){
    this.servicio.recuContrasena(this.recuForm.value).subscribe(
      res => {
        localStorage.setItem('recu', JSON.stringify(res));
        swal.fire({
          title: 'Recuperar contraseña',  
          text: 'Le hemos enviado un correo',  
          icon: 'info',
          width: 400,
         }).then(()=>{
          location.reload();
         })
      }, 
      err => {
        this.tituloAlerta=JSON.stringify(err.error.message);
        let alerta=this.tituloAlerta.replace(/['"]+/g, '');
         swal.fire({
          title: 'Error',  
          text: alerta,  
          icon: 'error',
          width: 400,
          background:'#ffbdb9'
         });
      }
    )
  }

}
