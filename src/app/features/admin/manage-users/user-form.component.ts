import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);

  userForm!: FormGroup;
  id?: number;
  modoEdicion = false;
  loading = false;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.modoEdicion = !!this.id;

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      role: ['ROLE_USER', Validators.required],
      active: [true]
    });

    if (this.modoEdicion) {
      this.userService.getById(this.id!).subscribe({
        next: (user) => this.userForm.patchValue(user),
        error: () => alert('Error al cargar usuario')
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const usuario: User = this.userForm.value;
    this.loading = true;

    const obs = this.modoEdicion
      ? this.userService.update(this.id!, usuario)
      : this.userService.create(usuario);

    obs.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/manage-users']);
      },
      error: () => {
        this.loading = false;
        alert('Error al guardar usuario');
      }
    });
  }
}
