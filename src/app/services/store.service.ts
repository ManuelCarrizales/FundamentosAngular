import { Injectable } from '@angular/core';
import { Product2 } from 'src/app/models/product2.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product2[] = [];
  //Entre parentesis se inizicializa el array como vacio para no tener problemas con la inicialización.
  private myCar = new BehaviorSubject<Product2[]>([]);

  //Todo lo que termine con un $ se refiere a un observable
  myCart$ = this.myCar.asObservable();

  addProduct(product:Product2){
    this.myShoppingCart.push(product);
    this.myCar.next(this.myShoppingCart);
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }
  getTotal(){
    return this.myShoppingCart.reduce((sum, item) => sum + item.price,0);
  }
}
