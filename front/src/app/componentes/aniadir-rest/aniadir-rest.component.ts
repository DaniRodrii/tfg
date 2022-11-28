import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../../servicios/restaurante.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: 'app-aniadir-rest',
  templateUrl: './aniadir-rest.component.html',
  styleUrls: ['./aniadir-rest.component.css']
})
export class AniadirRestComponent implements OnInit {

  constructor(public servicio: RestauranteService, private router: Router, private fb: FormBuilder) { }
  public aniadirRestForm!: FormGroup;
  tituloAlerta: string = '';
  ngOnInit(): void {
    this.aniadirRestForm = this.fb.group({
      nom_rest:['', [
        Validators.pattern(/^[A-za-z]+(\s[A-za-z]+)*$/)
      ]],
      nom_dueno:['', [
        Validators.pattern(/^[A-za-z]+\s[A-za-z]+$/)
      ]],
      telefono:['', [
        Validators.pattern(/^[0-9]{9}$/)
      ]],
      mesas:['', [
        Validators.min(0),
        Validators.max(100),
        Validators.pattern(/^[0-9]+$/)
      ]],
      direccion:['', [
        Validators.pattern(/^[A-za-z]+\s[A-za-z]+\s[0-9]+$/)
      ]],
    })
  }
 
  aniadir(){
    let token=localStorage.getItem("token")!;
    this.servicio.aniadirRest(this.aniadirRestForm.value, token).subscribe(
      res=>{
        swal.fire({
          title: 'Restaurante registrado',   
          icon: 'success',
          width: 400
         }).then(()=>{
            this.router.navigate(['/']);
         });
      },
      err=> {
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

} 
