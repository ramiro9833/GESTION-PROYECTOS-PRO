import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user = { name: '', email: '', phone: '', city: 'Los Mochis', password: '', role: 'DEVELOPER' };
  confirmEmail = '';
  confirmPass = '';
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onRegister(form: NgForm) {
    if (form.invalid || this.user.email !== this.confirmEmail || this.user.password !== this.confirmPass) return;

    const formData = new FormData();
    Object.keys(this.user).forEach(key => formData.append(key, (this.user as any)[key]));
    if (this.selectedFile) formData.append('avatar', this.selectedFile);

    this.authService.register(formData).subscribe({
      next: (res: any) => {
        localStorage.setItem('user_name', res.user.name);
        localStorage.setItem('user_role', res.user.role);
        localStorage.setItem('user_city', res.user.city);
        localStorage.setItem('user_avatar', res.user.avatar || '');
        this.router.navigate(['/dashboard']);
      },
      error: () => alert('Error en el registro')
    });
  }
}