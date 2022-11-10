import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';  
import { UsuarioService } from 'src/app/servicios/usuario.service';

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
             alert("Error");
          }
        )
  }

  obtenerFoto(event: any): void{
    const  img  = event.target.files[0];
    this.fotos=img;
  }

  editarUser(){
    const token=localStorage.getItem('token')!;
    
  }
 
  subirImg(): any{
  const token=localStorage.getItem('token')!;
  const img= new FormData;
  img.append('imagen', this.fotos);
  this.servicio.subidaImg(img, token).subscribe(
    res => {
      console.log(res);
    }
  )     
  }
}
