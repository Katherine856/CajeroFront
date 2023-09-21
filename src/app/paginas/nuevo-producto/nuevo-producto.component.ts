import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Cuenta } from 'src/app/compartido/modelado/cuenta';
import { HttpClient } from '@angular/common/http';
import { Servidor } from 'src/app/compartido/servidor/Servidor';
import { PanelErrorComponent } from 'src/app/componentes/panel-error/panel-error.component';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.scss']
})
export class NuevoProductoComponent {
  form: FormGroup;
  cliente: any;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private servidor: Servidor, public dialog: MatDialog) {
    this.form = fb.group({
      tipoCuenta: ['', Validators.required],
      clave: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
  }
  ngOnInit(): void {
  }

  nuevo() {
    this.cliente = JSON.parse(localStorage.getItem('usuario') || '{}');
    
    const cuenta: Cuenta = {
      numCuenta: null,
      tipoCuenta: {
        id_tipoCuenta: this.form.value.tipoCuenta,
        nombre_tp: '',
        interes: ''
      },
      docClientes: {
        documento: this.cliente.documento,
        t_documento: '',
        nombres: '',
        apellidos: '',
        correo: '',
        celular: 0,
        direccion: '',
        contrasena: '',
        sucursal: {
          id_sucursal: 0,
          nombre_s: 'null',
          direccion_s: 'null',
          telefono_s: 0
        }
      },
      saldo: 1000000,
      clave: this.form.value.clave
    }

    this.servidor.crearCuenta(cuenta).subscribe(
      data => console.log(data),
      error => {
        if (error.status != 201) {
          this.openDialog('Upss algo salio mal')
        }
        else {
          this.openDialog('Cuenta creada con exito')
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
