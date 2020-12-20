import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setTabLinks();
  }

  private setTabLinks(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });
    this.navLinks = [
      {
        label: 'Datos Generales',
        path: './general',
        icon: 'account_box',
        disabled: false,
        index: 0,
      },
      {
        label: 'Password',
        path: './password',
        icon: 'vpn_key',
        disabled: false,
        index: 1,
      },
    ];
  }
}
