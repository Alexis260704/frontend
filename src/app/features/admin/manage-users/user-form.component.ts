import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, ]
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  id: number | null = null;
  isEditMode = false;
  roles = ['ROLE_USER', 'ROLE_ADMIN'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      role: ['ROLE_USER', Validators.required],
      active: [true]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.id;

    if (this.isEditMode) {
      this.userService.getById(this.id!).subscribe((user: User) => {
        this.userForm.patchValue(user);
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const userData: User = this.userForm.value;

    if (this.isEditMode) {
      this.userService.update(this.id!, userData).subscribe(() => {
        this.router.navigate(['/admin/manage-users']);
      });
    } else {
      this.userService.create(userData).subscribe(() => {
        this.router.navigate(['/admin/manage-users']);
      });
    }
  }
}
