import { Injectable } from '@angular/core'; // <--- CORRECCIÓN
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        // Guardamos el token en el navegador
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('user_role', res.user.role);
      })
    );
  }

  logout() {
    localStorage.clear();
  }
}