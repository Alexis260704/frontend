export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
