import { OrderDetail } from './order-detail.model';

export interface Order {
  id: number;
  total: number;
  paymentMethod: string;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  shippingAddress: string;
  details: OrderDetail[];
  estimatedDelivery?: string;

  // Datos del cliente
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;

  comprobantePath?: string;
  // Datos del usuario (opcional)
  user?: {
    fullName: string;
  };
}
