import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
  iat: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  // 🔁 Señales para estado reactivo
  private loggedIn = signal(this.isAuthenticated());
  private usernameSig = signal(this.getUsername());

  public isLoggedInSig = this.loggedIn.asReadonly();
  public username$ = this.usernameSig.asReadonly();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, data).pipe(
      tap((res) => {
        const token = res.token;

        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token);
        }

        let decoded: JwtPayload;
        try {
          decoded = jwtDecode<JwtPayload>(token);
        } catch (err) {
          console.error('❌ Error al decodificar token:', err);
          this.router.navigate(['/login']);
          return;
        }

        console.log('✅ Token decodificado:', decoded);

        // 🔁 Actualiza señales reactivas
        this.loggedIn.set(true);
        this.usernameSig.set(decoded.sub || '');

        // Redirige según rol
        const role = decoded.role;
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (role === 'CLIENT') {
          this.router.navigate(['/user/tienda']);
        } else {
          console.warn('❌ Rol no reconocido:', role);
          this.router.navigate(['/login']);
        }
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.loggedIn.set(false);
    this.usernameSig.set('');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.role === 'ADMIN' ? 'ADMIN' : 'CLIENT';
    } catch (err) {
      console.warn('❌ Token inválido al obtener rol:', err);
      return null;
    }
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.sub || null;
    } catch (err) {
      console.warn('❌ Token inválido al obtener usuario:', err);
      return null;
    }
  }
  // ✅ Método clásico para guards
  public isLoggedIn(): boolean {
  return this.loggedIn();
}

}
