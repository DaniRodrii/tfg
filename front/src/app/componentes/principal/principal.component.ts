import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';     


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
    }
    
  }

  
}
