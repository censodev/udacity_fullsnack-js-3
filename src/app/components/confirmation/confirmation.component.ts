import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  _activatedRoute = inject(ActivatedRoute)
  _cart = inject(CartService)

  fullname!: string
  totalAmount!: number

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      this.fullname = params['fullname']
      this.totalAmount = params['totalAmount']
    })
    this._cart.clear()
  }
}
