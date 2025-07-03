import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupportService } from '../../../core/services/support.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-soporte-form',
  standalone: true,
  templateUrl: './soporte-form.component.html',
  styleUrls: ['./soporte-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class SoporteFormComponent {
  soporteForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private supportService: SupportService,
    private router: Router
  ) {
    this.soporteForm = this.fb.group({
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.soporteForm.invalid) return;

    this.supportService.enviarSolicitud(this.soporteForm.value).subscribe({
      next: () => {
        this.successMessage = 'Solicitud enviada correctamente.';
        this.soporteForm.reset();
        setTimeout(() => this.router.navigate(['/user/soporte']), 1500);
      },
      error: () => {
        this.errorMessage = 'Error al enviar la solicitud.';
      }
    });
  }
}
