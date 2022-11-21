import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from '../../servicios/empleado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from'sweetalert2';

@Component({
  selector: 'app-editar-emp',
  templateUrl: './editar-emp.component.html',
  styleUrls: ['./editar-emp.component.css']
})
export class EditarEmpComponent implements OnInit {

  constructor(public servicio: EmpleadoService, private router: Router, private fb: FormBuilder) { }
  public editarEmpForm!: FormGroup;
  ngOnInit(): void {
    if(localStorage.getItem('token') && localStorage.getItem('rest') && localStorage.getItem('emp')){

      this.editarEmpForm = this.fb.group({
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

      this.cargar();
    }else{
      this.router.navigate(['verEmp']);
    }
  }

  cargar(){
    let token=localStorage.getItem('emp')!;
      this.servicio.obtenerEmpleado(token).subscribe(
        res => {
          let empleados=JSON.stringify(res);
          this.servicio.empleado=JSON.parse(empleados);
        },
        err => {
          console.log(err)
        }
      ) 
  }
 
  editarEmp(){
    const token = localStorage.getItem('emp')!;


    if (this.editarEmpForm.value.nom_emp.length < 2) {
      this.editarEmpForm.removeControl('nom_emp');
    }

    if (this.editarEmpForm.value.edad.length < 2) {
      this.editarEmpForm.removeControl('edad');
    }

    if (this.editarEmpForm.value.telefono.length < 2) {
      this.editarEmpForm.removeControl('telefono');
    }

    if (this.editarEmpForm.value.cargo.length < 2) {
      this.editarEmpForm.removeControl('cargo');
    }

    if (this.editarEmpForm.value.DNI.length < 2) {
      this.editarEmpForm.removeControl('DNI');
    }

    if (this.editarEmpForm.value.sexo.length < 2) {
      this.editarEmpForm.removeControl('sexo');
    }

    if(this.editarEmpForm.value.sexo != 'Hombre' || this.editarEmpForm.value.sexo != 'Mujer'){
        this.editarEmpForm.removeControl('sexo');
    }

    if(this.editarEmpForm.value.cargo != 'Camarero' || this.editarEmpForm.value.cargo != 'Bartender' || this.editarEmpForm.value.cargo != 'Cajero' || this.editarEmpForm.value.cargo != 'Cocinero'){
        this.editarEmpForm.removeControl('cargo');
    }    

    if (JSON.stringify(this.editarEmpForm.value) === '{}') {
      swal.fire({
        title: 'Error',  
        text: 'No se puede enviar formularios vacios',  
        icon: 'warning',
        width: 400,
        color:'white',
        background:'#8c004b'

       }).then(()=>{
          this.router.navigate(["/verEmp"]);
       });
    } else {
      this.servicio.editarEmpleado(this.editarEmpForm.value, token).subscribe(
        res => {
          console.log(res);
          location.reload();
        },
        err => {
          console.log(err);
          location.reload();
        });
    }


  }
}
