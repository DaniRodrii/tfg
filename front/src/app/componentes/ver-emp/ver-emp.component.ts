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

}
