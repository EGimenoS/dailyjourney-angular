import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  createLoginFormGroup(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(20)]],
      password: [''],
    });
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe();
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginFormGroup();
  }
}
