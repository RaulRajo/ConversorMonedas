import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  title = 'Conversor Monedas';

  logout() {
    this.authService.logout();
  }
}
