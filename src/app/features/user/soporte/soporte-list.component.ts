    import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportService } from '../../../core/services/support.service';
import { SupportRequest } from '../../../shared/models/support-request.model';

@Component({
  selector: 'app-soporte-list',
  standalone: true,
  templateUrl: './soporte-list.component.html',
  styleUrls: ['./soporte-list.component.scss'],
  imports: [CommonModule]
})
export class SoporteListComponent implements OnInit {
  solicitudes: SupportRequest[] = [];
  errorMessage: string = '';

  constructor(private supportService: SupportService) {}

  ngOnInit(): void {
    this.supportService.listarSolicitudesUsuario().subscribe({
      next: (data) => this.solicitudes = data,
      error: () => this.errorMessage = 'No se pudieron cargar las solicitudes.'
    });
  }
}
