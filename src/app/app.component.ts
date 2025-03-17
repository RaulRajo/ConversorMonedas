import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConversorMonedasComponent } from "./components/conversor-monedas/conversor-monedas.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConversorMonedasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'conversor-monedas';
}
