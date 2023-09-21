import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PanelClaveComponent } from 'src/app/componentes/panel-clave/panel-clave.component';
import { DatePipe } from '@angular/common';
import { Servidor } from 'src/app/compartido/servidor/Servidor';
import { Transaccion } from 'src/app/compartido/modelado/transaccion';
import { PanelErrorComponent } from 'src/app/componentes/panel-error/panel-error.component';

@Component({
  selector: 'app-consignar',
  templateUrl: './consignar.component.html',
  styleUrls: ['./consignar.component.scss']
})
export class ConsignarComponent implements OnInit {

  form: FormGroup;
  cuentas: any;
  cliente = JSON.parse(localStorage.getItem('usuario') || '{}');
  today = new Date();

  constructor(private fb: FormBuilder, private router: Router, public dialog: MatDialog, private servidor: Servidor) {
    this.form = fb.group({
      cuenta: ['', Validators.required],
      doc: ['', Validators.required],
      monto: ['', Validators.required],
      cOrigen: ['', [Validators.required]],
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

  consignar() {
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
      tipoTransaccion: "Consignación",
      fecha: fechaHoy.transform(this.today, 'YYYY-MM-dd'),
      numCuentaDestino: this.form.value.cuenta,
      numDocDestino: this.form.value.doc,
      monto: this.form.value.monto
    }

    console.log(transaccion)
    this.servidor.consignar(transaccion).subscribe(data =>{
      this.openDialogError('Consignación realizada con exito')
    }, error => {
      if(error.status !== 200){
        this.openDialogError('Saldo insuficiente')
      }else{
        this.openDialogError('Consignación realizada con exito')
      }
    }
    )
  }

  openDialogError(mensaje: String) {
    this.dialog.open(PanelErrorComponent, {
      data: {
        mensaje: mensaje,
      },
    });
  }

  openDialogClave() {
    this.dialog.open(PanelErrorComponent, {
      data: {
        mensaje: 'la consignacion:',
      },
    });
  }

}
