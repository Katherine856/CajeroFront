import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PanelErrorComponent } from 'src/app/componentes/panel-error/panel-error.component';
import { Credenciales } from 'src/app/compartido/modelado/credenciales';
import { Servidor } from 'src/app/compartido/servidor/Servidor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  info: any;

  constructor(private fb: FormBuilder, private router: Router, public dialog: MatDialog, private servidor: Servidor) {
    this.form = fb.group({
      usuario: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      clave: ['', Validators.required, Validators.maxLength(16)]
    });
  }

  ngOnInit(): void {
  }
  ingresar() {

    const credenciales: Credenciales = {
      documento: this.form.value.usuario,
      contrasena: this.form.value.clave
    }
    
    this.servidor.login(credenciales).subscribe(data => {
      if(data!=null){
        localStorage.setItem('usuario', JSON.stringify(data));
        this.router.navigate(['/consignar']);
      }else{
        this.openDialog()
      }
    }, error =>{
      this.openDialog()
    });
  }
  openDialog() {
    this.dialog.open(PanelErrorComponent, {
      data: {
        mensaje: 'Usuario y/o contraseña incorrectos',
      },
    });
  }
}