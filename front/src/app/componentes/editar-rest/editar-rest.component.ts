import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestauranteService } from '../../servicios/restaurante.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from'sweetalert2';

@Component({
  selector: 'app-editar-rest',
  templateUrl: './editar-rest.component.html',
  styleUrls: ['./editar-rest.component.css']
})
export class EditarRestComponent implements OnInit {

  constructor(public servicioRest: RestauranteService,private router : Router,  private fb: FormBuilder) { }

  restaur={}

  public editarRestForm!: FormGroup;

  ngOnInit(): void {
    this.editarRestForm = this.fb.group({
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

    if(localStorage.getItem('rest')){
      this.cargar();
    }else{
      this.router.navigate(['verRestaurante']);
    }

    
      
    

  }

  cargar(){
    const token=localStorage.getItem('rest')!;
    this.servicioRest.editarRest(token).subscribe(
      res => {
        let datos=JSON.stringify(res);
        this.servicioRest.restaur=JSON.parse(datos);
      },
      err => {
         console.error(err);
      }
    )
  }

  editarRest(){
    const token = localStorage.getItem('rest')!;


    if (this.editarRestForm.value.nom_rest.length < 2) {
      this.editarRestForm.removeControl('nom_rest');
    }

    if (this.editarRestForm.value.nom_dueno.length < 2) {
      this.editarRestForm.removeControl('nom_dueno');
    }

    if (this.editarRestForm.value.telefono.length < 2) {
      this.editarRestForm.removeControl('telefono');
    }

    if (this.editarRestForm.value.mesas.length < 2) {
      this.editarRestForm.removeControl('mesas');
    }

    if (this.editarRestForm.value.direccion.length < 2) {
      this.editarRestForm.removeControl('direccion');
    }

    if (JSON.stringify(this.editarRestForm.value) === '{}') {
      swal.fire({
        title: 'Error',  
        text: 'No se puede enviar formularios vacios',  
        icon: 'warning',
        width: 400,
        color:'white',
        background:'#8c004b'

       }).then(()=>{
          this.router.navigate(["/verRestaurante"]);
       });
    } else {
      this.servicioRest.editarRestauranteDatos(this.editarRestForm.value, token).subscribe(
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
 
}
