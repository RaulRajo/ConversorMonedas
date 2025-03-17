import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = signal(this.isLoggedIn());
  private user = signal(this.getUserFromStorage());

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') { // Simulación
      localStorage.setItem('user', JSON.stringify({ username }));
      this.user.set(username);
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('user');
    this.user.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  getUserFromStorage(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).username : null;
  }

  get isAuthenticated$() {
    return this.isAuthenticated;
  }

  get user$() {
    return this.user;
  }
}
