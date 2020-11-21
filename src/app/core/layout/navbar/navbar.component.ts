import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';
import { UserSession } from '../../interfaces/user-session';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showMenu: boolean;
  width: number;
  toggleButtonIcon = 'menu';
  currentUser: Observable<UserSession>;
  constructor(public dialog: MatDialog, private authService: AuthService) {}

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

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, { minWidth: '30%' });
  }

  onClickLogout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.width = window.innerWidth;
    this.showMenu = this.width <= 768 ? false : true;
  }
}
