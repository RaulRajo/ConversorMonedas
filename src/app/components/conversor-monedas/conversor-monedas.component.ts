import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/moneda/moneda.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conversor-monedas',
  templateUrl: './conversor-monedas.component.html',
  styleUrls: ['./conversor-monedas.component.scss'],
  imports: [FormsModule]
})
export class ConversorMonedasComponent implements OnInit {
  currencies: string[] = [];
  fromCurrency: string = 'EUR';
  toCurrency: string = 'USD';
  amount: number = 1;
  convertedAmount: number | null = null;
  rates: any = {};
  historial: any[] = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.obtenerTasasDeCambio(this.fromCurrency); // Inicializamos con EUR como moneda base
    this.cargarHistorial(); // Cargar historial desde localStorage
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
    if (this.rates[this.toCurrency]) {
      this.convertedAmount = this.amount * this.rates[this.toCurrency];

      // Guardamos la conversión en el historial
      const nuevaConversion = {
        fecha: new Date().toLocaleString(),
        de: this.fromCurrency,
        a: this.toCurrency,
        cantidad: this.amount,
        resultado: this.convertedAmount
      };
      this.historial.push(nuevaConversion);
      localStorage.setItem('historial', JSON.stringify(this.historial)); // Guardamos el historial en localStorage
    }
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
