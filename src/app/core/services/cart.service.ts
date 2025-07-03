import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../../shared/models/cart-item.model';
import { Product } from '../../shared/models/product.model';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSignal = signal<CartItem[]>([]);
  public readonly items$ = this.itemsSignal.asReadonly();

  constructor() {
    if (isBrowser()) {
      this.loadFromLocalStorage();
    }
  }

  getItems(): CartItem[] {
    return this.itemsSignal();
  }

agregarProducto(producto: Product | null | undefined, cantidad: number = 1): void {
  if (!producto) {
    alert('❌ Producto inválido');
    return;
  }

  if (producto.stock < cantidad) {
    alert('❌ No hay stock suficiente para agregar este producto');
    return;
  }

  const items = [...this.itemsSignal()];
  const index = items.findIndex(item => item.producto.id === producto.id);

  if (index >= 0) {
    const nuevaCantidad = items[index].cantidad + cantidad;
    if (nuevaCantidad > producto.stock) {
      alert('❌ No puedes agregar más unidades de las disponibles');
      return;
    }
    items[index].cantidad = nuevaCantidad;
  } else {
    items.push({ producto, cantidad });
  }

  this.itemsSignal.set(items);
  this.saveToLocalStorage();

  // ✅ Mensaje de éxito solo si se agregó correctamente
  alert(`✅ Se agregó "${producto.name}" al carrito`);
}




  eliminarProducto(idProducto: number): void {
    const updated = this.itemsSignal().filter(item => item.producto.id !== idProducto);
    this.itemsSignal.set(updated);
    this.saveToLocalStorage();
  }

  vaciarCarrito(): void {
    this.itemsSignal.set([]);
    this.saveToLocalStorage();
  }

  calcularTotal(): number {
    return this.itemsSignal().reduce((total, item) => {
      return total + (Number(item.producto.price) * item.cantidad);
    }, 0);
  }

  cambiarCantidad(productoId: number, delta: number): void {
    const items = [...this.itemsSignal()];
    const index = items.findIndex(i => i.producto.id === productoId);

    if (index >= 0) {
      items[index].cantidad += delta;

      if (items[index].cantidad <= 0) {
        items.splice(index, 1);
      }

      this.itemsSignal.set(items);
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage(): void {
    if (isBrowser()) {
      localStorage.setItem('carrito', JSON.stringify(this.itemsSignal()));
    }
  }

  private loadFromLocalStorage(): void {
    if (isBrowser()) {
      const data = localStorage.getItem('carrito');
      if (data) {
        this.itemsSignal.set(JSON.parse(data));
      }
    }
  }

  // ✅ Reactive count for UI (e.g., navbar)
  public readonly itemsCount = computed(() =>
    this.itemsSignal().reduce((acc, item) => acc + item.cantidad, 0)
  );
}
