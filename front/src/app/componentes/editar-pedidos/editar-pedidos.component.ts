import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from '../../servicios/pedidos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from'sweetalert2';

@Component({
  selector: 'app-editar-pedidos',
  templateUrl: './editar-pedidos.component.html',
  styleUrls: ['./editar-pedidos.component.css']
})
export class EditarPedidosComponent implements OnInit {

  constructor(public servicio: PedidosService,private router : Router,  private fb: FormBuilder) { }

  public editarPedidoForm!: FormGroup;

  ngOnInit(): void {
    if(localStorage.getItem('token') && sessionStorage.getItem('ped')){
      this.editarPedidoForm = this.fb.group({
        nom:['', [
          Validators.pattern(/^([A-za-zñ]+\s*)+$/)
        ]],
        descripcion:['', [
          Validators.pattern(/^([A-za-zñ]+\s*)+$/)
        ]],
        precio:['', [
          Validators.min(0),
          Validators.max(1000),
          Validators.pattern(/^[0-9]+$/)
        ]],
        direccion:['', [
          Validators.pattern(/^[A-za-zñ]+\s[A-za-zñ]+\s[0-9]+$/)
        ]],
        ciudad:['', [
          Validators.pattern(/^([A-za-zñ]+\s*)+$/)
        ]],
      })
  
      this.cargar();
    }
  }

  cargar(){
    const token = sessionStorage.getItem('ped')!;

    this.servicio.verPedido(token).subscribe(
      res => {
        let empleados=JSON.stringify(res);
        this.servicio.ped=JSON.parse(empleados);
      },
      err => {
        console.log(err);
      });
  }

  editarRest(){
    const token = sessionStorage.getItem('ped')!;


    if (this.editarPedidoForm.value.nom.length < 2) {
      this.editarPedidoForm.removeControl('nom');
    }

    if (this.editarPedidoForm.value.descripcion.length < 2) {
      this.editarPedidoForm.removeControl('descripcion');
    }

    if (this.editarPedidoForm.value.precio.length < 2) {
      this.editarPedidoForm.removeControl('precio');
    }

    if (this.editarPedidoForm.value.direccion.length < 2) {
      this.editarPedidoForm.removeControl('direccion');
    }

    if (this.editarPedidoForm.value.ciudad.length < 2) {
      this.editarPedidoForm.removeControl('ciudad');
    }

    if (JSON.stringify(this.editarPedidoForm.value) === '{}') {
      swal.fire({
        title: 'Error',  
        text: 'No se puede enviar formularios vacios',  
        icon: 'warning',
        width: 400,
        color:'white',
        background:'#8c004b'

       }).then(()=>{
          this.router.navigate(["/verPedidos"]);
       });
    } else {
      this.servicio.editarPedido(this.editarPedidoForm.value, token).subscribe(
        res => {
          swal.fire({
            title: 'Pedido editado', 
            icon: 'success',
            width: 400
    
           }).then(()=>{
              this.ngOnInit();
           });
          
          
        },
        err => {
          console.log(err);
        });
    }
  }

}
