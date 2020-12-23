import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSession } from 'src/app/core/interfaces/user-session';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import { mustMatch } from 'src/app/core/validators/must-match';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  currentUser: UserSession;
  changePasswordForm: FormGroup;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {}

  createChangePasswordFormGroup(): FormGroup {
    return this.fb.group(
      {
        password: [''],
        passwordConfirmation: [''],
      },
      {
        validator: mustMatch('password', 'passwordConfirmation'),
      }
    );
  }

  onSubmit(): void {
    this.usersService.changePassword(this.changePasswordForm.value).subscribe();
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => (this.currentUser = user));
    this.changePasswordForm = this.createChangePasswordFormGroup();
  }

  handleCloseMenuClick(): void {
    this.router.navigateByUrl('home');
  }
}
