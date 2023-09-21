import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  mensaje: string;
}

@Component({
  selector: 'app-panel-error',
  templateUrl: './panel-error.component.html',
  styleUrls: ['./panel-error.component.scss']
})

export class PanelErrorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
}
