import { Component, OnInit } from '@angular/core';
import { UsuarioService} from '../../servicios/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from'sweetalert2';

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
  tituloAlerta: string = '';

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nom_compl:[' ', [
        Validators.pattern(/^[A-za-zñ]+(\s[A-za-zñ]+)*$/)
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
          this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
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
         this.ngOnInit();
        }
      )
    }else{
         swal.fire({
          title: 'Error',  
          text: 'Contraseñas no coincidentes',  
          icon: 'warning',
          width: 400,
          color:'white',
          background:'#8c004b'
         });
      this.registroForm.addControl('contrasenaRep', this.registroForm.value.contrasenaRep);
    }    
    
  }

}

