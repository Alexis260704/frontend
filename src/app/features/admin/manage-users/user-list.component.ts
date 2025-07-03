import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [CommonModule, RouterLink]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (data) => this.users = data,
      error: () => this.errorMessage = 'No se pudo cargar la lista de usuarios.'
    });
  }

  eliminarUsuario(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

    this.userService.delete(id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== id);
    });
  }
}
