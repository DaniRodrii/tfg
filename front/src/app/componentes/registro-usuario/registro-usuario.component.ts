import { Component, OnInit } from '@angular/core';
import { UsuarioService} from '../../servicios/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  usuario={}

  constructor(public servicio: UsuarioService, private router: Router, private fb: FormBuilder) { }
  public registroForm!: FormGroup;
  resultado!: string;

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nom_compl:[' ', [
        
      ]],
      nom_user:[' ', [
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.pattern(/^[a-zA-Z0-9]+$/)
      ]],
      edad:[' ', [      
        Validators.min(18),
        Validators.max(90),
        Validators.pattern(/^[0-9]+$/)

      ]],
      correo:[' ', [     
        Validators.email
      ]],
      contrasena:[' ', [     
        Validators.minLength(6),
        Validators.maxLength(18)
      ]],
      contrasenaRep:[' ', [     
        Validators.minLength(6),
        Validators.maxLength(18)
      ]]
    })
  }

   

  registrarse(){
    if(this.registroForm.value.contrasenaRep == this.registroForm.value.contrasena){
      this.registroForm.removeControl('contrasenaRep');

      this.servicio.registro(this.registroForm.value).subscribe(
        res => {
          localStorage.setItem('token', JSON.stringify(res));
          alert("Usuario registrado");
          this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
        },
        err => {
          alert(err.error.message);
        }
      )
    }else{
      alert("Contraseñas no coincidentes");
      this.registroForm.addControl('contrasenaRep', this.registroForm.value.contrasenaRep);
    }    
    
  }

}

