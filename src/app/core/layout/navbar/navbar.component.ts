import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../components/register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showMenu: boolean;
  width: number;
  toggleButtonIcon = 'menu';
  constructor(public dialog: MatDialog) {}

  onResize(): void {
    this.width = window.innerWidth;
    this.showMenu = this.width <= 768 ? false : true;
    this.toggleButtonIcon = this.width >= 768 ? 'menu' : this.toggleButtonIcon;
  }

  toggleMenuVisibility(): void {
    this.showMenu = !this.showMenu;
    this.toggleButtonIcon = this.toggleButtonIcon === 'menu' ? 'clear' : 'menu';
  }

  openRegisterDialog(): void {
    this.dialog.open(RegisterComponent, { minWidth: '30%' });
  }

  ngOnInit(): void {
    this.width = window.innerWidth;
    this.showMenu = this.width <= 768 ? false : true;
  }
}
