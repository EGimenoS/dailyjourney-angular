import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showMenu: boolean;
  width: number;
  constructor() {}

  onResize(): void {
    this.width = window.innerWidth;
    this.showMenu = this.width <= 768 ? false : true;
  }

  toggleMenuVisibility(): void {
    this.showMenu = !this.showMenu;
  }

  ngOnInit(): void {
    this.width = window.innerWidth;
    this.showMenu = this.width <= 768 ? false : true;
  }
}
