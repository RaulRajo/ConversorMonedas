import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Defino la interfaz para la estructura del historial según la base de datos
interface Conversion {
  id: number;
  usuario_id: number;
  fecha: string;
  de: string;
  a: string;
  cantidad: number;
  resultado: number;
}

@Component({
  selector: 'app-historial',
  standalone: true,
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent {
  historial = signal<Conversion[]>([]);  // Defino la señal como un array de Conversion

  constructor(private http: HttpClient) {
    this.obtenerHistorial(); // Obtener historial al iniciar el componente
  }

  // Función para obtener el historial desde el backend
  obtenerHistorial(): void {
    const token = localStorage.getItem('token'); // Obtener el token desde localStorage

    // Realizamos la solicitud GET para obtener el historial desde el backend
    this.http.get<Conversion[]>('http://localhost:5000/historial', {
      headers: {
        Authorization: `Bearer ${token}`,  // Usamos el token para autorización
      },
    }).subscribe(
      (data) => {
        // Al recibir los datos, los asignamos al historial
        this.historial.set(data); // Actualizamos la señal con el historial desde el backend
      },
      (error) => {
        console.error('Error al obtener el historial', error);
      }
    );
  }

  // Función para limpiar el historial
  limpiarHistorial(): void {
    const token = localStorage.getItem('token'); // Obtener el token desde localStorage

    // Realizamos la solicitud para limpiar el historial
    this.http.delete('http://localhost:5000/historial', {
      headers: {
        Authorization: `Bearer ${token}`,  // Usamos el token para autorización
      },
    }).subscribe(
      () => {
        // Si la limpieza fue exitosa, vaciamos el historial en el frontend
        this.historial.set([]);  // Limpiamos la señal
      },
      (error) => {
        console.error('Error al limpiar el historial', error);
      }
    );
  }
}
