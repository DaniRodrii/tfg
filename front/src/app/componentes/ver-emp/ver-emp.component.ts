import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../servicios/empleado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: 'app-ver-emp',
  templateUrl: './ver-emp.component.html',
  styleUrls: ['./ver-emp.component.css']
})
export class VerEmpComponent implements OnInit {

  constructor(public servicio: EmpleadoService, private router: Router, private fb: FormBuilder) { }
  public aniadirEmpForm!: FormGroup;
  public filtradoDNI!: FormGroup;
  tituloAlerta: string = '';
  ngOnInit(): void {
    if(localStorage.getItem('token') && localStorage.getItem('rest')){
      let token=localStorage.getItem('rest')!;
      this.servicio.obtenerEmpleados(token).subscribe(
        res => {
          let empleados=JSON.stringify(res);
          this.servicio.emp=JSON.parse(empleados);
        },
        err => {
          console.log(err)
        }
      ) 

      this.aniadirEmpForm = this.fb.group({
        nom_emp:['', [
          Validators.pattern(/^[A-za-z]+(\s[A-za-z]+)*$/)
        ]],
        DNI:['', [
          Validators.pattern(/^[0-9]{8}[A-Z]{1}$/)
        ]],
        telefono:['', [
          Validators.pattern(/^[0-9]{9}$/)
        ]],
        edad:['', [
          Validators.min(0),
          Validators.max(100),
          Validators.pattern(/^[0-9]+$/)
        ]],
        sexo:['', [

        ]],
        cargo:['', [

        ]]
      })
    }

    if(localStorage.getItem('emp')){
      localStorage.removeItem('emp');
    }
  }

  aniadir(){
    let token=localStorage.getItem("rest")!;
    this.servicio.aniadirEmp(this.aniadirEmpForm.value, token).subscribe(
      res=>{
        swal.fire({
          title: 'Empleado registrado',   
          icon: 'success',
          width: 400
         }).then(()=>{
            this.ngOnInit();
         });
      },
      err=> {
        this.tituloAlerta=JSON.stringify(err.error.message);
        let alerta=this.tituloAlerta.replace(/['"]+/g, '');
         swal.fire({
          title: 'Error',  
          text: alerta,  
          icon: 'error',
          width: 400,
          background:'#ffbdb9'
         });
         this.ngOnInit()
      }
    )
  }

  borrar(){
    const id=localStorage.getItem('emp')!;
    this.servicio.borrarEmp(id).subscribe(
    res=>{
      swal.fire({
        title: 'Empleado borrado', 
        icon: 'success',
        width: 400,
       }).then(()=>{
        localStorage.removeItem('emp');
        this.ngOnInit();
       });
    }
      )
  }

  subir(id: string){
    this.servicio.cifrarId(id).subscribe(
    res=>{
      localStorage.setItem('emp', JSON.stringify(res));
    }
      )
  }

  ordenar(categoria: string){
    if(categoria == 'nom_emp'){
      this.servicio.emp.sort(function (a:any, b:any){
        if (a.nom_emp > b.nom_emp) {
          return 1;
        }
        if (a.nom_emp < b.nom_emp) {
          return -1;
        }
        return 0;
      }) 
    }
  }

  filtrarCargo(){

  }

  filtrarDNI(){
    let token=localStorage.getItem('rest')!
    this.servicio.buscarDNI(this.filtradoDNI.value, token).subscribe(
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
          this.servicio.emp=rest;
        }
      },
      err => {
        console.log(err)
      }
        )
  }

}
