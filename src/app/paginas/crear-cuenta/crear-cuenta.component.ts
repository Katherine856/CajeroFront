import { Component } from '@angular/core';
import { Cliente } from 'src/app/compartido/modelado/cliente';
import { Cuenta } from 'src/app/compartido/modelado/cuenta';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servidor } from 'src/app/compartido/servidor/Servidor';
import { PanelErrorComponent } from 'src/app/componentes/panel-error/panel-error.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss']
})
export class CrearCuentaComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private servidor: Servidor, public dialog: MatDialog) {
    this.form = fb.group({
      t_doc: ['', [Validators.required]],
      numDoc: ['', [Validators.required]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      direccion: ['', Validators.required],
      tipoCuenta: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.maxLength(16)]],
      clave: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
  }

  crearCuenta() {
    const cliente: Cliente = {
      documento: this.form.value.numDoc,
      t_documento: this.form.value.t_doc,
      nombres: this.form.value.nombres,
      apellidos: this.form.value.apellidos,
      correo: this.form.value.correo,
      celular: this.form.value.celular,
      direccion: this.form.value.direccion,
      contrasena: this.form.value.contrasena,
      sucursal: {
        id_sucursal: 1,
        nombre_s: 'null',
        direccion_s: 'null',
        telefono_s: 0
      }
    }

    const cuenta: Cuenta = {
      numCuenta: null,
      tipoCuenta: {
        id_tipoCuenta: this.form.value.tipoCuenta,
        nombre_tp: '',
        interes: ''
      },
      docClientes: cliente,
      saldo: 1000000,
      clave: this.form.value.clave
    }
    console.log(cuenta)

    this.servidor.crearCliente(cliente).subscribe(
      data => {

      },
      error => {
        if (error.status != 201) {
          this.openDialog('Hubo un error, intentalo nuevamente')
        } else {
          this.servidor.crearCuenta(cuenta).subscribe(
            data => console.log(data),
            error => {
              if (error.status != 201) {
                this.openDialog('Documento existente')
              }
              else {
                this.openDialog('Creado con exito')
                this.router.navigate(['/'])
              }
          })
        }
      })
  }

  openDialog(mensaje:String) {
    this.dialog.open(PanelErrorComponent, {
      data: {
        mensaje: mensaje,
      },
    });
  }

}
