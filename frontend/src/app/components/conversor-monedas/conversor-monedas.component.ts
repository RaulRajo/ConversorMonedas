import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/moneda/moneda.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-conversor-monedas',
  templateUrl: './conversor-monedas.component.html',
  styleUrls: ['./conversor-monedas.component.scss'],
  imports: [FormsModule]
})
export class ConversorMonedasComponent implements OnInit {
  currencies: string[] = [];
  fromCurrency: string = 'EUR'; // Inicializo EUR como la moneda base del from
  toCurrency: string = 'USD'; // Inicializo USD como la moneda base del to
  amount: number = 1;
  convertedAmount: number | null = null;
  rates: any = {};
  historial: any[] = [];

  constructor(
    private currencyService: CurrencyService,
    private http: HttpClient
    ) {}

  ngOnInit(): void {
    this.obtenerTasasDeCambio(this.fromCurrency);
    this.cargarHistorial();
  }

  // Esta función se llama cuando el usuario selecciona una nueva moneda de origen
  onFromCurrencyChange(): void {
    this.obtenerTasasDeCambio(this.fromCurrency);
  }

  obtenerTasasDeCambio(baseCurrency: string): void {
    this.currencyService.getExchangeRates(baseCurrency).subscribe((data) => {
      console.log('Datos de la API:', data);
      this.rates = data.rates;
      this.currencies = Object.keys(data.rates);
    });
  }

  convert(): void {
    // Enviar solicitud POST para hacer la conversión y guardar el historial
    const token = localStorage.getItem('token');  // Obtener el token de autenticación

    const body = {
      de: this.fromCurrency,
      a: this.toCurrency,
      cantidad: this.amount
    };

    this.http.post('http://localhost:5000/convert', body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe(
      (response: any) => {
        this.convertedAmount = response.resultado;

        const nuevaConversion = {
          fecha: new Date().toLocaleString(),
          de: this.fromCurrency,
          a: this.toCurrency,
          cantidad: this.amount,
          resultado: this.convertedAmount
        };
        this.historial.push(nuevaConversion);
        localStorage.setItem('historial', JSON.stringify(this.historial));  // Guardar el historial en localStorage para que se añada dinámicamente al componente
      },
      (error) => {
        console.error('Error al realizar la conversión:', error);
      }
    );
  }

  // Función para cargar el historial desde localStorage
  cargarHistorial(): void {
    const historialGuardado = localStorage.getItem('historial');
    if (historialGuardado) {
      this.historial = JSON.parse(historialGuardado);
    }
  }

  // Función para limpiar el historial
  limpiarHistorial(): void {
    localStorage.removeItem('historial');
    this.historial = [];
  }
}
