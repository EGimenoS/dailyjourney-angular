import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { SnackBarData } from '../interface/snackbar-data';

// contains some user interfaces elements that are used across the whole app

@Injectable({
  providedIn: 'root',
})
export class UiService {
  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Contains in progress loading services (http requests)
  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  constructor(private snackbar: MatSnackBar) {}

  // maintains the loadingMap adding and removing requests
  setLoading(loading: boolean, url: string): void {
    if (!url) {
      throw new Error('The request URL must be provided');
    }
    if (loading === true) {
      this.loadingMap.set(url, loading);
      this.loadingSub.next(true);
    } else if (loading === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      this.loadingSub.next(false);
    }
  }

  openSnackBar(notif: SnackBarData): void {
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      panelClass: notif.class,
      data: notif.message,
    });
  }
}
