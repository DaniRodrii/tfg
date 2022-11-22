import { Component, OnInit } from '@angular/core';
import { StockService } from '../../servicios/stock.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: 'app-aniadir-stock',
  templateUrl: './aniadir-stock.component.html',
  styleUrls: ['./aniadir-stock.component.css']
})
export class AniadirStockComponent implements OnInit {

  constructor(public servicio: StockService, private router: Router, private fb: FormBuilder) { }
  public aniadirStockForm!: FormGroup;
  ngOnInit(): void { 
    if(localStorage.getItem('token') && localStorage.getItem('rest')){

      this.aniadirStockForm = this.fb.group({
        nom_prod:['', [
          Validators.pattern(/^[A-za-z]+(\s[A-za-z]+)*$/)
        ]],
        cantidad:['', [
          Validators.pattern(/^[0-9]+$/)
        ]],
        coste_total:['', [
          Validators.pattern(/^[0-9]+$/)
        ]],
        estado:['', [
          Validators.required
        ]]
      })

    }else{
      this.router.navigate(['verRestaurante']);
    }
  }


  aniadir(){
    let token=localStorage.getItem("rest")!;
    this.servicio.aniadirStock(this.aniadirStockForm.value, token).subscribe(
      res=>{
        swal.fire({
          title: 'Producto registrado',   
          icon: 'success',
          width: 400
         }).then(()=>{
            this.router.navigate(['/verStock']);
         });
      },
      err=> {
        console.log(err)
      }
  )}
  
}
