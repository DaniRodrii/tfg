import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-recu-contra',
  templateUrl: './recu-contra.component.html',
  styleUrls: ['./recu-contra.component.css']
})
export class RecuContraComponent implements OnInit {

  constructor(public servicio: UsuarioService, private router: Router, private fb: FormBuilder) { }
  public contraForm!: FormGroup;
  ngOnInit(): void {
    this.contraForm = this.fb.group({
      contrasena:[' ', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18)
      ]],
      contrasenaRepetida:[' ', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18)
      ]]
    })
  }

  contrasena(){
    let token=localStorage.getItem("recu")!;
    if(this.contraForm.value.contrasena == this.contraForm.value.contrasenaRepetida){
      this.contraForm.removeControl('contrasenaRepetida');
      this.servicio.contraseñaRecuperada(this.contraForm.value, token).subscribe(
        res => {
          swal.fire({
            title: 'Contraseña actualizada', 
            icon: 'success',
            width: 400,
           }).then(()=>{
            localStorage.removeItem("recu");
            window.close();
           });
        },
        err => {
          swal.fire({
            title: 'Error',  
            text: err.error.message,  
            icon: 'warning',
            width: 400,
            color:'white',
            background:'#8c004b'
    
           });
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
    }
  }
}
 