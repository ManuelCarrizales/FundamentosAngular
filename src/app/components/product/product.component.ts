import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product2 } from 'src/app/models/product2.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product2 =
    {
      id: '',
      title: '',
      price: 0,
      image: '',
      description: '',
      category: '',
    }
  @Output() addedProduct = new EventEmitter<Product2>();

  onAddToCart(){
    this.addedProduct.emit(this.product);
  }
}
