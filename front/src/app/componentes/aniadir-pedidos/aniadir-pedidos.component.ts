import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../servicios/pedidos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: 'app-aniadir-pedidos',
  templateUrl: './aniadir-pedidos.component.html',
  styleUrls: ['./aniadir-pedidos.component.css']
})
export class AniadirPedidosComponent implements OnInit {

  constructor(public servicio: PedidosService, private router: Router, private fb: FormBuilder) { }
  public aniadirPedidoForm!: FormGroup;
  ngOnInit(): void {
    this.aniadirPedidoForm = this.fb.group({
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
      nom_rest:['', [
        Validators.required
      ]],
    })

    this.cargarRest();
  }

  aniadir(){
    if(this.aniadirPedidoForm.value.nom_rest == 0){ 
      swal.fire({
        title: 'Error',  
        text: 'Elija el nombre del restaurante',  
        icon: 'warning',
        width: 400,
        color:'white',
        background:'#8c004b'

       })
    }else{
      let token=localStorage.getItem("token")!;
      this.servicio.aniadirPedido(this.aniadirPedidoForm.value, token).subscribe(
        res=>{
          swal.fire({
            title: 'Pedido registrado',   
            icon: 'success',
            width: 400
           }).then(()=>{
              this.router.navigate(['/verPedidos']);
           });
        },
        err=> {
          console.log(err)
        }
      )
    }
  }

  cargarRest(){
    let token=localStorage.getItem("token")!;
    this.servicio.cargarRestaurantes(token).subscribe(
      res=>{
        let datos=JSON.stringify(res);
        this.servicio.pedidos=JSON.parse(datos);
        if(this.servicio.pedidos.length<=0){
          this.router.navigate(["/"])
        }
      },
      err=> {
        console.log(err)
      }
    )
  }
}
