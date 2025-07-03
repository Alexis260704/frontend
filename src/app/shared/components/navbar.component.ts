import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    SearchBarComponent
  ]
})
export class NavbarComponent {
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);

  itemsCount = this.cartService.itemsCount;

  // ✅ Ahora usan señales reactivas del AuthService
  isLoggedIn = this.authService.isLoggedInSig;
  username = this.authService.username$;

  logout() {
    this.authService.logout();
  }
}
