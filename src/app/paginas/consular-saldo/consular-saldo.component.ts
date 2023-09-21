import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PanelClaveComponent } from 'src/app/componentes/panel-clave/panel-clave.component';
import { Servidor } from 'src/app/compartido/servidor/Servidor';
import { Transaccion } from 'src/app/compartido/modelado/transaccion';
import { DatePipe } from '@angular/common';
import { PanelErrorComponent } from 'src/app/componentes/panel-error/panel-error.component';


@Component({
  selector: 'app-consular-saldo',
  templateUrl: './consular-saldo.component.html',
  styleUrls: ['./consular-saldo.component.scss']
})
export class ConsularSaldoComponent {

  form: FormGroup;
  cuentas: any;
  cliente = JSON.parse(localStorage.getItem('usuario') || '{}');
  today = new Date();

  constructor(private fb: FormBuilder, private router: Router, public dialog: MatDialog, private servidor: Servidor) {
    this.form = fb.group({
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

  consultar() {
    this.llamadaServidor()

  }

  llamadaServidor() {
    let fechaHoy = new DatePipe('en-US');
    let hoy = fechaHoy.transform(this.today, 'YYYY-MM-dd');

    console.log(hoy);

    const transaccion: Transaccion = {
      id_transaccion: null,
      numCuentas: {
        numCuenta: this.form.value.cOrigen,
        tipoCuenta: null,
        docClientes: null,
        saldo: null,
        clave: null
      },
      tipoTransaccion: "Consultar",
      fecha: hoy,
      numCuentaDestino: this.form.value.cuenta,
      numDocDestino: this.form.value.doc,
      monto: this.form.value.monto
    }

    console.log(transaccion)
    this.servidor.consultar(transaccion).subscribe(data => {
      if(data!=null){
        this.openDialogAlert('Su saldo es: ' + data)
      }
    })
  }

  openDialog() {
    this.dialog.open(PanelClaveComponent, {
      data: {
        mensaje: ' con la consulta: '
      },
    });
  }

  openDialogAlert(mensaje:String) {
    this.dialog.open(PanelErrorComponent, {
      data: {
        mensaje: mensaje,
      },
    });
  }
}
