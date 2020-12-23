import { Component, OnInit } from '@angular/core';
import { UserSession } from 'src/app/core/interfaces/user-session';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  editUserForm: FormGroup;
  currentUser: UserSession;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.usersService.updateUserData(this.editUserForm.value).subscribe();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => (this.currentUser = user));
    this.editUserForm = this.createEditUserFormGroup();
  }

  createEditUserFormGroup(): FormGroup {
    return this.fb.group({
      name: [this.currentUser.name, [Validators.required, Validators.minLength(10)]],
      avatar: [this.currentUser.avatar || ''],
    });
  }

  handleCloseMenuClick(): void {
    this.router.navigateByUrl('home');
  }
}
