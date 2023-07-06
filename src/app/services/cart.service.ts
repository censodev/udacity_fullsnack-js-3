import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  add(id: number, qty: number) {
    const cart = this.getAll()
    cart[id] = (cart[id] ?? 0) + qty
    localStorage.setItem('cart', JSON.stringify(cart))
  }
  set(id: number, qty: number) {
    const cart = this.getAll()
    cart[id] = qty
    localStorage.setItem('cart', JSON.stringify(cart))
  }
  getAll(): { [key: number]: number } {
    return JSON.parse(localStorage.getItem('cart') ?? '{}')
  }
  clear() {
    localStorage.removeItem('cart')
  }
}
