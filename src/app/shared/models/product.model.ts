export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  featured: boolean;
  categoryName?: string;
  brandName?: string;
  categoryId?: number;
  brandId?: number;
}
