import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { mustMatch } from '../../validators/must-match';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder, private usersService: UsersService) {}

  createLoginFormGroup(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(20)]],
      password: [''],
    });
  }

  onSubmit(): void {
    this.usersService.createNewUser(this.loginForm.value).subscribe();
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginFormGroup();
  }
}
