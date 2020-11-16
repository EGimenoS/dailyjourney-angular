import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { mustMatch } from '../../validators/must-match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder, private usersService: UsersService) {}

  createRegisterFormGroup(): FormGroup {
    return this.fb.group(
      {
        email: [{ value: '' }, [Validators.required, Validators.maxLength(20)]],
        name: [{ value: '' }, [Validators.required, Validators.maxLength(20)]],
        password: [''],
        passwordConfirmation: [''],
      },
      {
        validator: mustMatch('password', 'passwordConfirmation'),
      }
    );
  }

  onSubmit(): void {
    console.log(this.registerForm.value);
  }
  cancelForm(): void {
    console.log('cancelado');
  }

  ngOnInit(): void {
    this.registerForm = this.createRegisterFormGroup();
  }
}
