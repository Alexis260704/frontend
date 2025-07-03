import { Product } from './product.model';

export interface CartItem {
  producto: Product;
  cantidad: number;
}
