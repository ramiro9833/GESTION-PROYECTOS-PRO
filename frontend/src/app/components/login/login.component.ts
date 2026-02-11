import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router'; // Añade RouterModule
import { FormsModule, NgForm } from '@angular/forms'; // Añade NgForm
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  showPassword = false;
  loginData = { email: '', password: '' };
  
  constructor(private authService: AuthService, private router: Router) {}

  // Cambia el parámetro de (event: Event) a (form: NgForm)
  onLogin(form: NgForm) {
    if (form.invalid) return;

    this.authService.login(this.loginData).subscribe({
      next: (res: any) => {
        // Guardamos los datos necesarios para el Dashboard
        localStorage.setItem('user_name', res.user.name);
        localStorage.setItem('user_avatar', res.user.avatar || '');
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        alert('Credenciales incorrectas');
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}