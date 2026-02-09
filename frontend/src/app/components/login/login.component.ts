import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Objeto para capturar los datos del formulario
  loginData = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(event: Event) {
    event.preventDefault();
    
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        console.log('Login exitoso', res);
        // Si el login es correcto, mandamos al usuario al Dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error en el login', err);
        alert('Credenciales incorrectas. Revisa la consola (F12)');
      }
    });
  }
}