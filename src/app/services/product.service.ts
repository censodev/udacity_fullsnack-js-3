import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

const URL = '/assets/data.json'

export type Product = {
  id: number
  name: string
  price: number
  url: string
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  _http = inject(HttpClient)

  list(): Observable<Product[]> {
    return this._http.get<Product[]>(URL)
  }

  get(id: number): Observable<Product | undefined> {
    return this.list().pipe(
      map(lst => lst.find(i => i.id == id))
    )
  }
}
