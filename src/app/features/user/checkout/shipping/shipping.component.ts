import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutStepsComponent } from '../../../../shared/components/checkout-steps/checkout-steps.component'; // 👈 Importa componente

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckoutStepsComponent // 👈 Agrégalo a los imports
  ],
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent {
  shippingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.shippingForm = this.fb.group({
      direccion: ['', Validators.required],
      referencia: [''],
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required]
    });
  }

  continuar(): void {
    if (this.shippingForm.valid) {
      const datosEnvio = this.shippingForm.value;

      const direccionCompleta = `${datosEnvio.direccion}, ${datosEnvio.distrito}, ${datosEnvio.provincia}, ${datosEnvio.departamento}` +
        (datosEnvio.referencia ? ` (Ref: ${datosEnvio.referencia})` : '');

      localStorage.setItem('shippingAddress', direccionCompleta);

      this.router.navigate(['/user/checkout/payment']);
    } else {
      this.shippingForm.markAllAsTouched();
    }
  }
}
