import { Component, OnInit } from '@angular/core';
import { StockService } from '../../servicios/stock.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: 'app-editar-stock',
  templateUrl: './editar-stock.component.html',
  styleUrls: ['./editar-stock.component.css']
})
export class EditarStockComponent implements OnInit {

  constructor( public servicio: StockService, private router: Router, private fb: FormBuilder ) { }
  public editarStockForm!: FormGroup;

  ngOnInit(): void {
    if(localStorage.getItem('token') && localStorage.getItem('rest') && localStorage.getItem("stock")){

      this.editarStockForm = this.fb.group({
        nom_prod:['', [
          Validators.pattern(/^[A-za-zñ]+(\s[A-za-zñ]+)*$/)
        ]],
        cantidad:['', [
          Validators.pattern(/^[0-9]+$/)
        ]],
        coste_total:['', [
          Validators.pattern(/^[0-9]+$/)
        ]],
        estado:['', [

        ]]
      })

      this.cargar();

    }else{
      this.router.navigate(['verStock']);
    }
  }

  cargar(){
    const token=localStorage.getItem('stock')!;
    this.servicio.obtenerProd(token).subscribe(
      res => {
        let datos=JSON.stringify(res);
        this.servicio.prod=JSON.parse(datos);
      },
      err => {
         console.error(err);
      }
    )
  }


  editar(){
    const token = localStorage.getItem('stock')!;


    if (this.editarStockForm.value.nom_prod.length < 2) {
      this.editarStockForm.removeControl('nom_prod');
    }

    if (this.editarStockForm.value.cantidad.length < 2) {
      this.editarStockForm.removeControl('cantidad');
    }

    if (this.editarStockForm.value.coste_total.length < 2) {
      this.editarStockForm.removeControl('coste_total');
    }

    if (this.editarStockForm.value.estado.length < 2) {
      this.editarStockForm.removeControl('estado');
    }

    if (JSON.stringify(this.editarStockForm.value) === '{}') {
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
      this.servicio.editarStockDatos(this.editarStockForm.value, token).subscribe(
        res => {
          console.log(res);  
        localStorage.removeItem('stock');
          location.reload();
        },
        err => {
          console.log(err);
          // location.reload();
        });
    }
  }
}
