import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { SnackBarData } from '../interface/snackbar-data';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(private snackbar: MatSnackBar) {}

  openSnackBar(notif: SnackBarData): void {
    console.log(notif.class);
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      panelClass: notif.class,
      data: notif.message,
    });
  }
}
