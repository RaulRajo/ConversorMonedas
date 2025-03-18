import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = signal(this.isLoggedIn());
  private user = signal(this.getUserFromStorage());
  private apiUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify({ username }));
          this.user.set(username);
          this.isAuthenticated.set(true);
          this.router.navigate(['/']);
        },
        error: () => {
          alert('Credenciales incorrectas');
        }
      });
  }

  register(username: string, password: string) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, { username, password })
      .subscribe({
        next: () => {
          alert('Usuario registrado correctamente');
          this.router.navigate(['/login']);
        },
        error: () => {
          alert('Error al registrar usuario');
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getUserFromStorage(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).username : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  get isAuthenticated$() {
    return this.isAuthenticated;
  }

  get user$() {
    return this.user;
  }
}
