import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-historial',
  standalone: true,
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss',
})
export class HistorialComponent {
  historial = signal(this.getHistorial());

  getHistorial() {
    return JSON.parse(localStorage.getItem('historial') || '[]');
  }

  limpiarHistorial() {
    localStorage.removeItem('historial');
    this.historial.set([]);
  }
}
