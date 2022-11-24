import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestauranteService } from 'src/app/servicios/restaurante.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-ver-rest',
  templateUrl: './ver-rest.component.html',
  styleUrls: ['./ver-rest.component.css']
})
export class VerRestComponent implements OnInit {

  constructor(public servicio: RestauranteService, private router: Router) { }
  
  rest={};
  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';
  opcionSeleccionado2: string  = '0';
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.cargar();
      this.cargarRest();
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
 
  subir(id: string){
    this.servicio.cifrarId(id).subscribe(
    res=>{
      localStorage.setItem('rest', JSON.stringify(res));
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

  filtrarDir(){
    let token=localStorage.getItem('token')!
    this.verSeleccion=this.opcionSeleccionado;
    
    let nom={nom_dueno: this.verSeleccion};
    if(this.verSeleccion != '0'){
      this.servicio.filtradoDireccion(nom, token).subscribe(
        res=>{
          let restaurante=JSON.stringify(res);
            this.servicio.rest=JSON.parse(restaurante);
        },
        err => {
          console.log(err)
        }
          )
    }else{
      this.cargar();
    }
    
  }

  cargarRest(){
    let token=localStorage.getItem('token')!
    this.servicio.obtenerRestaurantes(token).subscribe(
      res=>{
        let datos=JSON.stringify(res);
        this.servicio.rest2=JSON.parse(datos);
        console.log(this.servicio.rest2);
        if(this.servicio.rest2.length<=0){
          swal.fire({
            title: 'Error',  
            text: 'No hay restaurantes añadidos',  
            icon: 'warning',
            width: 400,
            color:'white',
            background:'#8c004b'
    
           }).then(()=>{
              this.router.navigate(["/"]);
          });
          
        }
      },
      err=> {
        console.log(err)
      }
    )
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
            if(this.verSeleccion == '10'){
              if(array[i].mesas>10){
                array.splice(i, 1);
              }
              
            }else if(this.verSeleccion == '50'){
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

}
