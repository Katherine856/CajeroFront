import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PanelClaveComponent } from 'src/app/componentes/panel-clave/panel-clave.component';
import { DatePipe } from '@angular/common';
import { Servidor } from 'src/app/compartido/servidor/Servidor';
import { Transaccion } from 'src/app/compartido/modelado/transaccion';
import { PanelErrorComponent } from 'src/app/componentes/panel-error/panel-error.component';

@Component({
  selector: 'app-retirar',
  templateUrl: './retirar.component.html',
  styleUrls: ['./retirar.component.scss']
})
export class RetirarComponent {
  form: FormGroup;
  cuentas: any;
  cliente = JSON.parse(localStorage.getItem('usuario') || '{}');
  today = new Date();

  constructor(private fb: FormBuilder, private router: Router, public dialog: MatDialog, private servidor: Servidor) {
    this.form = fb.group({
      monto: ['', Validators.required],
      cOrigen: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCuentas()
  }

  getCuentas() {
    this.servidor.verCuentasCliente(this.cliente.documento).subscribe(data => {
      this.cuentas = data;
    })
  }

  retirar() {
    this.llamadaServidor()
  }

  llamadaServidor() {
    var fechaHoy = new DatePipe('en-US');

    const transaccion: Transaccion = {
      id_transaccion: null,
      numCuentas: {
        numCuenta: this.form.value.cOrigen,
        tipoCuenta: null,
        docClientes: null,
        saldo: null,
        clave: null
      },
      tipoTransaccion: "Retirar",
      fecha: fechaHoy.transform(this.today, 'YYYY-MM-dd'),
      numCuentaDestino: this.form.value.cuenta,
      numDocDestino: this.form.value.doc,
      monto: this.form.value.monto
    }

    console.log(transaccion)
    this.servidor.retirar(transaccion).subscribe(data =>{
      this.openDialog('Consignación realizada con exito')
    }, error => {
      this.openDialog('Saldo insuficiente')  
    })
  }

  openDialog(mensaje: string) {
    this.dialog.open(PanelErrorComponent, {
      data: {
        mensaje: mensaje,
      },
    });
  }


}
