import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  @Output() loggedIn = new EventEmitter<void>();

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    console.log(
      ' LoginFormComponent > login > this.loginForm:',
      this.loginForm.valid
    );
    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.value;
      this.authService.login(login!, password!).subscribe({
        next: () => this.loggedIn.emit(),
        error: (err) => {
          // obsłuż błąd logowania
          console.error('Błąd logowania', err);
        },
      });
    }
  }
}
