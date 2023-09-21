import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Servidor } from 'src/app/compartido/servidor/Servidor';
import { PanelErrorComponent } from '../panel-error/panel-error.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private router: Router, public dialog: MatDialog, private servidor: Servidor){}
  intereses(){
    this.servidor.calIntereses().subscribe(data =>{
      
    }, error =>{
      if (error.status == 200){
        this.openDialog('Calculado con exito')
      }
    })

  }
  cerrar(){
    localStorage.removeItem('usuario');
    this.router.navigate(['/'])
  }

  openDialog(mensaje: String){ 
    this.dialog.open(PanelErrorComponent, {
      data: {
        mensaje: mensaje,
      },
    });
  }
}
