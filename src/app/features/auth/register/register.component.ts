import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    console.log('🟢 onSubmit ejecutado');

    if (this.registerForm.invalid) {
      console.warn('⚠️ Formulario inválido:', this.registerForm.value);
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        console.log('✅ Registro exitoso');
        this.successMessage = 'Registro exitoso. Redirigiendo al login...';
        this.errorMessage = '';
        this.registerForm.reset();
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        console.error('❌ Error al registrar:', err);
        this.errorMessage = 'Error al registrar. Verifica tus datos.';
        this.successMessage = '';
      }
    });
  }
}
