import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  usuario={}
  private imagenTmp:any;
  constructor(public servicio: UsuarioService,private router : Router,  private fb: FormBuilder) { }
  
  public editarForm!: FormGroup;
  
  ngOnInit(): void {
      this.cargar();

      this.editarForm = this.fb.group({
        imagen:[' ', [
          
        ]],
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
  
        ]]
      })
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
             alert("Error");
          }
        )
  }

  obtenerFoto($event: any): void{
    const [ img ] = $event.target.files;
    this.imagenTmp = {
      fileRaw:img,
      fileName: img.name
    }
    console.log(this.imagenTmp);
  }
  
  editarUser(){
    const token=localStorage.getItem('token')!;
    
  }

  subirImg(){
    const imagen = new FormData();
    imagen.append('img', this.imagenTmp.fileRaw, this.imagenTmp.fileName);

    this.servicio.subidaImg(imagen).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.error(err);
      }
    )
  }

}
