import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log('📨 onSubmit ejecutado');

    if (this.loginForm.invalid) {
      console.warn('⚠️ Formulario inválido:', this.loginForm.value);
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        console.log('✅ Login exitoso');
        // La redirección se maneja dentro del AuthService
      },
      error: (err) => {
        console.error('❌ Error al loguear:', err);
        this.errorMessage = 'Correo o contraseña incorrectos.';
      }
    });
  }
}
