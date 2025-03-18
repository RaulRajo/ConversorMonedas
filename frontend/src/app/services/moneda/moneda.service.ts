import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private exchangeRateApiUrl = 'https://api.exchangerate-api.com/v4/latest/';

  constructor(private http: HttpClient) {}

  getExchangeRates(base: string): Observable<any> {
    return this.http.get(`${this.exchangeRateApiUrl}${base}`);
  }
}
