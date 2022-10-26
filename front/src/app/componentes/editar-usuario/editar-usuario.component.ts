import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  constructor(public servicio: UsuarioService,private router : Router) { }

  

  ngOnInit(): void {
     
  }

}
