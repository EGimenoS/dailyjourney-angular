import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showMenu: boolean;
  width: number;
  toggleButtonIcon = 'menu';
  constructor() {}

  onResize(): void {
    this.width = window.innerWidth;
    this.showMenu = this.width <= 768 ? false : true;
    this.toggleButtonIcon = this.width >= 768 ? 'menu' : this.toggleButtonIcon;
  }

  toggleMenuVisibility(): void {
    this.showMenu = !this.showMenu;
    this.toggleButtonIcon = this.toggleButtonIcon === 'menu' ? 'clear' : 'menu';
  }

  ngOnInit(): void {
    this.width = window.innerWidth;
    this.showMenu = this.width <= 768 ? false : true;
  }
}
