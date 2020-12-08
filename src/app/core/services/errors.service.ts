import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../components/alert/alert.component';
import { DialogData } from '../interfaces/dialog-data';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  constructor(private dialog: MatDialog) {}

  openDialog(data: DialogData): void {
    this.dialog.open(AlertComponent, {
      width: '450px',
      data,
    });
  }

  public handleError(error, action): void {
    console.log(error);
    if (error.status === 0 || error.status === 500) {
      const data = {
        title: `Error de servidor en la operación ${action}`,
        message: 'La solicitud no pudo completarse, pruebe en unos minutos',
      };
      this.openDialog(data);
    } else {
      const data = {
        title: `Error ${action}`,
        message: error.error.error,
      };
      this.openDialog(data);
    }
  }
}
