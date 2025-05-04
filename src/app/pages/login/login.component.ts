import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {  Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';

import { LoginServiceService } from '../../services/login-service/login-service.service';
import { LoginModel } from '../../core/models/login.model';
import { LoginResponse } from '../../core/models/login.response';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    PasswordModule,
    InputIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  get userName(): string {
    return this.getFormControl('userName');
  }

  get password(): string {
    return this.getFormControl('password');
  }

  constructor(
    private readonly loginService: LoginServiceService,
    private readonly router: Router
  ) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submitForm(): void {
    const login = {
      userName: this.userName,
      password: this.password,
    } as LoginModel;
    this.loginService.authLogin(login).subscribe({
      next: (res: LoginResponse) => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('userName', res.userName);

        this.router.navigate(['']);
      },
      error: () => {
        localStorage.clear();
      },
    });
  }

  getFormControl(control: string) {
    return this.loginForm.get(control)?.value;
  }
}
