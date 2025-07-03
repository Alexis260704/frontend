export interface OrderHistory {
  id: number;
  total: number;
  paymentMethod: string;
  shippingAddress: string;
  estimatedDelivery?: string;
  status: string;
  details: OrderHistoryDetail[]; // ✅ <--- esta línea es necesaria
}

export interface OrderHistoryDetail {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}
