import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: '',
      password: '',
    });
  }

  ngOnInit(): void {
    // Verifica si el usuario ya está autenticado
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/convert']);
    }
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    if (this.authService.login(username!, password!)) {
      this.router.navigate(['/convert']);
    } else {
      this.errorMessage = 'Credenciales incorrectas';
    }
  }
}
