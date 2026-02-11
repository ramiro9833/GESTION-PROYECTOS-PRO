import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'; 
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Si entras a la raíz, te manda al login
  { 
    path: 'login', 
    component: LoginComponent, 
    title: 'Iniciar Sesión | ERP SYSTEM' // Angular cambiará el título automáticamente
  },
  { 
    path: 'register', 
    component: RegisterComponent, 
    title: 'Registro | ERP SYSTEM' 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    title: 'Panel Principal | ERP SYSTEM' 
  },
];