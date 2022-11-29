import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestauranteService } from 'src/app/servicios/restaurante.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from'sweetalert2';

@Component({
  selector: 'app-ver-rest',
  templateUrl: './ver-rest.component.html',
  styleUrls: ['./ver-rest.component.css']
}) 
export class VerRestComponent implements OnInit {

  constructor(public servicio: RestauranteService, private router: Router, private fb: FormBuilder) { }
  public filtrarRestForm!: FormGroup;
  rest={};
  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';
  opcionSeleccionado2: string  = '0';
  ngOnInit(): void {
    this.filtrarRestForm = this.fb.group({
      nom_dueno:['', [
        Validators.pattern(/^[A-za-z]+(\s[A-za-z]+)*$/)
      ]]
    })
    if(localStorage.getItem('token')){
      this.cargar();
    }

    if(localStorage.getItem('rest')){
      localStorage.removeItem('rest');
    }
  }

  cargar(){
    let token=localStorage.getItem('token')!;
    this.servicio.obtenerRestaurantes(token).subscribe(
      res => {
        let restaurante=JSON.stringify(res);
        this.servicio.rest=JSON.parse(restaurante);
      },
      err => {
        console.log(err)
      }
    ) 
  }
 
  subir(id: string, pos: number){
    this.servicio.cifrarId(id).subscribe(
    res=>{
      localStorage.setItem('rest', JSON.stringify(res));
      if(pos==1){
        this.router.navigate(['/verEmp']).then(()=> location.reload());
      }else if(pos == 2){
        this.router.navigate(['/verStock']).then(()=> location.reload());
      }else if(pos == 3){
        this.router.navigate(['/editarRest']).then(()=> location.reload());
      }
    }
      ) 
  }

  borrar(){
    const id=localStorage.getItem('rest')!;
    this.servicio.borrarRest(id).subscribe(
    res=>{
      swal.fire({
        title: 'Restaurante borrado', 
        icon: 'success',
        width: 400,
       }).then(()=>{
        localStorage.removeItem('rest');
        this.ngOnInit();
       });
    }
      )
  }

  ordenar(categoria: string){
    if(categoria == 'nom_rest'){
      this.servicio.rest.sort(function (a:any, b:any){
        if (a.nom_rest > b.nom_rest) {
          return 1;
        }
        if (a.nom_rest < b.nom_rest) {
          return -1;
        }
        return 0;
      })
    }else if(categoria == 'nom_dueno'){
        this.servicio.rest.sort(function (a:any, b:any){
          if (a.nom_dueno > b.nom_dueno) {
            return 1;
          }
          if (a.nom_dueno < b.nom_dueno) {
            return -1;
          }
          return 0;
        })
    }else if(categoria == 'telefono'){
      this.servicio.rest.sort(function (a:any, b:any){
        return (b.telefono - a.telefono)
      })
    }else if(categoria == 'mesas'){
      this.servicio.rest.sort(function (a:any, b:any){
        return (b.mesas - a.mesas)
      })
    }else if(categoria == 'direccion'){
      this.servicio.rest.sort(function (a:any, b:any){
        if (a.direccion > b.direccion) {
          return 1;
        }
        if (a.direccion < b.direccion) {
          return -1;
        }
        return 0;
      })
    }
  }

  filtrarMesas(){
    let token=localStorage.getItem('token')!
    this.verSeleccion=this.opcionSeleccionado2;
    if(this.verSeleccion != '0'){
      this.servicio.obtenerRestaurantes(token).subscribe(
        res => {
          let restaurante=JSON.stringify(res);
          let array=JSON.parse(restaurante);
          for(let i=0; i<array.length;i++ ){
              if(this.verSeleccion == '50'){
                if(array[i].mesas>50){
                  array.splice(i, 1);
                }
            }else if(this.verSeleccion == '100'){
              if(array[i].mesas>100){
                array.splice(i, 1);
              }
            }
          }
          this.servicio.rest=array;
        },
        err => {
          console.log(err)
        }
      ) 
    }else{
      this.cargar();
    }
  }

  filtrarNomRest(){
    let token=localStorage.getItem('token')!
    this.servicio.filtradoDuenos(this.filtrarRestForm.value, token).subscribe(
      res=>{
        let restaurante=JSON.stringify(res);
        let rest=JSON.parse(restaurante);

        if(rest.length == 0){
          swal.fire({
            title: 'El dueño no existe', 
            icon: 'warning',
            width: 400,
           }).then(()=>{
            this.ngOnInit();
           });
        }else{
          this.servicio.rest=rest;
        }
      },
      err => {
        console.log(err)
      }
        )
  }

}
