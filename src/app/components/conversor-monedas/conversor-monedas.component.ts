import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/moneda.service';
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

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getExchangeRates('EUR').subscribe((data) => {
      this.rates = data.rates;
      this.currencies = Object.keys(data.rates);
    });
  }

  convert() {
    if (this.rates[this.toCurrency]) {
      this.convertedAmount = this.amount * this.rates[this.toCurrency];
    }
  }
}
