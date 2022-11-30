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
      images: [],
      description: '',
      category: {
        id: '',
        name:''
      },
    }
  @Output() addedProduct = new EventEmitter<Product2>();
  @Output() showProduct = new EventEmitter<string>(); 

  onAddToCart(){
    this.addedProduct.emit(this.product);
  }
  showDetail(){
    this.showProduct.emit(this.product.id);
  }
}
