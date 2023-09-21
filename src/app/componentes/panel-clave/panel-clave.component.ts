import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PanelErrorComponent } from '../panel-error/panel-error.component';
import { MatDialog } from '@angular/material/dialog';

export interface DialogData {
  mensaje: string;
}

@Component({
  selector: 'app-panel-clave',
  templateUrl: './panel-clave.component.html',
  styleUrls: ['./panel-clave.component.scss']
})
export class PanelClaveComponent {

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder, private router: Router, public dialog: MatDialog) {
    this.form = fb.group({
      clave: ['', Validators.required],
    });
  }

  confirmar(){
    const cont = this.form.value.clave;
    if (cont == '12345') {
      console.log(cont)
    }else{
      this.openDialog();
    }
  }

  openDialog() {
    this.dialog.open(PanelErrorComponent, {
      data: {
        mensaje: 'Clave incorrecta',
      },
    });
  }
}
