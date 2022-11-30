import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';  
import { UsuarioService } from 'src/app/servicios/usuario.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  usuario={}
  public fotos : any;
  
  constructor(public servicio: UsuarioService,private router : Router,  private fb: FormBuilder, private sanitizer: DomSanitizer) { }
  
  public editarForm!: FormGroup;
  
  ngOnInit(): void {
      if(localStorage.getItem('token')){
        this.cargar();

        this.editarForm = this.fb.group({
          imagen:[' ', [
            
          ]],
          nom_compl:[' ', [
            Validators.pattern(/^[A-za-zñ]+(\s[A-za-zñ]+)*$/),
            Validators.minLength(6),
            Validators.maxLength(25),
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
    
          ]]
        })
        
      }
  }
 
  cargar(){
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

  obtenerFoto(event: any): void{
    const  img  = event.target.files[0];
    this.fotos=img;
  }

  editarUser(){
    const token = localStorage.getItem('token')!;

    this.editarForm.removeControl('imagen');

    console.log(this.editarForm.value);


    if (this.editarForm.value.nom_compl.length < 6) {
      this.editarForm.removeControl('nom_compl');
    }

    if (this.editarForm.value.nom_user.length < 6) {
      this.editarForm.removeControl('nom_user');
    }

    if (this.editarForm.value.edad.length < 2) {
      this.editarForm.removeControl('edad');
    }

    if (JSON.stringify(this.editarForm.value) === '{}') {
      swal.fire({
        title: 'Error',  
        text: 'No se puede enviar formularios vacios',  
        icon: 'warning',
        width: 400,
        color:'white',
        background:'#8c004b'

       }).then(()=>{
          this.router.navigate(["/verUser"]);
       });
    } else {
      this.servicio.editarUsuario(this.editarForm.value, token).subscribe(
        res => {
          console.log(res);
          location.reload();
        },
        err => {
          console.log(err);
          // location.reload();
        });
    }

  }
 
  subirImg(): any{
  const token=localStorage.getItem('token')!;
  const img= new FormData;
  img.append('imagen', this.fotos);
  this.servicio.subidaImg(img, token).subscribe(
    res => {
      console.log(res);
      location.reload();
    }
  )     
  }
}
