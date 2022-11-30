import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';     
import swal from 'sweetalert2';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  
  constructor(private router : Router, private renderer: Renderer2 ) { }

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      let navBar=document.getElementsByTagName("nav")[0];

      const a=this.renderer.createElement('a');
      this.renderer.setProperty(a, 'routerlink', '/editarUser');
      


      const img=this.renderer.createElement('img');
      this.renderer.setProperty(img, 'src', '../../../assets/fotoperfil.png');
      this.renderer.setStyle(img, 'width', '60px');
      this.renderer.setStyle(img, 'height', 'auto');
      this.renderer.setStyle(img, 'border-radius', '50px');
      this.renderer.setStyle(img, 'margin-right', '10px');
      
      this.renderer.appendChild(navBar, a);

      let cookies = document.cookie;
      let cookieSplit=cookies.split(";");
      let existe=false;
      if(cookies.length != 0){
        for(let i=0; i<cookieSplit.length; i++){
          let valor=cookieSplit[i].split("=");
          if(valor[1].trim()=="true"){
            existe=true;
          }
        }
      }
      


      if(!existe){
        swal.fire({
          title: 'Su sesión ha finalizado',  
          text: '¿Quiere extenderla?',  
          icon: 'info',
          width: 400,
          showCancelButton: true,
          confirmButtonText: 'Extender sesión',
          cancelButtonText: 'Cancelar'
  
         }).then((result)=>{
          if(result.isConfirmed){
            const d = new Date();
            d.setTime(d.getTime() + (60*60*1000));
            let expires = d.toUTCString();
            document.cookie = 'sesion=true; expires = '+expires+' ;';
          }else{
            localStorage.removeItem("token");
            this.router.navigate(["/verUser"]);
          }
         });
      }

      
    }

    
    
  }

  
}
