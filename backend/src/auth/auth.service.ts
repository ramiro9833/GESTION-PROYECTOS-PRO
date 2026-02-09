import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    register(formData: FormData) {
        return this.http.post(`${this.apiUrl}/register`, formData).pipe(
            tap((res: any) => {
            // Opcional: Si quieres que entre directo al Dashboard tras registrarse
            localStorage.setItem('access_token', res.access_token);
            })
        );
    }
}
