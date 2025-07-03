import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [CommonModule]
})
export class PerfilComponent implements OnInit {
  private userService = inject(UserService);

  user: User | null = null;
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.userService.getPerfil().subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudo cargar el perfil.';
        this.loading = false;
        console.error('❌ Error al cargar perfil:', err);
      }
    });
  }
}
