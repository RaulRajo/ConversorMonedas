import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, RouterModule],
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      this.authService.register(username, password);
    } 
  }
}
