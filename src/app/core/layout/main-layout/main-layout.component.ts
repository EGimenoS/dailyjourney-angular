import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { ProfileService } from '../../services/profile.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  loading = false;
  constructor(private uiService: UiService, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.uiService.loadingSub.pipe(delay(0)).subscribe((loading) => (this.loading = loading));
  }
}
