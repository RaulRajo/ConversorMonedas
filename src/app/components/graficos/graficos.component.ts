import { Component, signal } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [NgxChartsModule], 
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.scss',
})
export class GraficosComponent {
  datosGrafico = signal([
    { name: 'USD', value: 1.10 },
    { name: 'EUR', value: 1.00 },
    { name: 'GBP', value: 0.85 }
  ]);
}
