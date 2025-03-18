import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ConversorMonedasComponent } from './components/conversor-monedas/conversor-monedas.component';
import { HistorialComponent } from './components/historial/historial.component';
import { GraficosComponent } from './components/graficos/graficos.component';
import { AuthGuard } from './services/auth/auth.guard';

export const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },  
  { path: 'convert', component: ConversorMonedasComponent, canActivate: [AuthGuard] },  
  { path: 'historial', component: HistorialComponent, canActivate: [AuthGuard] },
  { path: 'graficos', component: GraficosComponent, canActivate: [AuthGuard] },
  { path: '', component: ConversorMonedasComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];
