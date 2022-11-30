import { Injectable } from '@angular/core';
import { Product2 } from 'src/app/models/product2.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  myShoppingCart: Product2[] = [];

  constructor() { }

  addProduct(product:Product2){
    this.myShoppingCart.push(product);
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }
  getTotal(){
    return this.myShoppingCart.reduce((sum, item) => sum + item.price,0);
  }
}
