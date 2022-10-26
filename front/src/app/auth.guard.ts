import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from './servicios/usuario.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private servicio: UsuarioService, private router: Router){
    
  }

  canActivate(): boolean{
    if(this.servicio.logueado()){
      return true;
    }

    this.router.navigate(['/loginUser'])
    return false;
  }
  
}
