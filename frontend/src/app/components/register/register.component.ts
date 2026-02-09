import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { name: '', email: '', phone: '', city: '', password: '' };
  selectedFile: File | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onRegister(event: Event) {
    event.preventDefault();

    // VALIDACIÓN: Teléfono de 10 dígitos (Ingeniería de Software básica)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(this.user.phone)) {
      alert('El teléfono debe contener exactamente 10 números.');
      return;
    }

    // FormData es necesario para enviar archivos físicos
    const formData = new FormData();
    formData.append('name', this.user.name);
    formData.append('email', this.user.email);
    formData.append('password', this.user.password);
    formData.append('phone', this.user.phone);
    formData.append('city', this.user.city);
    
    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile);
    }

    this.authService.register(formData).subscribe({
      next: (res) => {
        alert('Registro exitoso. ¡Bienvenido!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar usuario. Revisa que el correo no esté duplicado.');
      }
    });
  }
}