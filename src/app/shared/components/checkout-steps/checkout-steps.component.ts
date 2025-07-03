import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-checkout-steps',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './checkout-steps.component.html',
  styleUrls: ['./checkout-steps.component.scss']
})
export class CheckoutStepsComponent {
  currentStep = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute // 👈 necesario para navegación relativa
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const path = this.router.url;
        if (path.includes('cart')) this.currentStep = 'cart';
        else if (path.includes('shipping')) this.currentStep = 'shipping';
        else if (path.includes('payment')) this.currentStep = 'payment';
      });
  }

  irA(paso: string): void {
  if (this.esNavegable(paso)) {
    this.router.navigate([`/user/checkout/${paso}`]);
  }
  }


  esNavegable(paso: string): boolean {
  const pasosOrdenados = ['cart', 'shipping', 'payment'];
  const indiceActual = pasosOrdenados.indexOf(this.currentStep);
  const indiceDestino = pasosOrdenados.indexOf(paso);

  // Permitir ir solo a pasos anteriores inmediatos (no más de uno atrás)
  return indiceDestino < indiceActual && indiceDestino === indiceActual - 1;
}

}
