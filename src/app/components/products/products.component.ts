import { Component, OnInit } from '@angular/core';
import { Product2 } from 'src/app/models/product2.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor(private storeService: StoreService,private productsServices: ProductsService){
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  myShoppingCart: Product2[] = [];
  total = 0;
  today = new Date();
  date = new Date(2021,1,21);
  product2 : Product2[] = [
    // {
    //   id: '1',
    //   name: "Original",
    //   price: 500,
    //   image: './assets/images/original.jpg',
    // },
    // {
    //   id: '2',
    //   name: "Dragon Obsidiana",
    //   price: 500,
    //   image: './assets/images/dragonobsidiana.jpg'
    // },
    // {
    //   id: '3',
    //   name: "Dragon Obsidiana Prestigiosa",
    //   price: 500,
    //   image: './assets/images/dragonobsidianaprestigiosa.jpg',
    // },
    // {
    //   id: '4',
    //   name: "Flor Espiritual",
    //   price: 500,
    //   image: './assets/images/florespiritual.jpg'
    // },
    // {
    //   id: '5',
    //   name: "Mecha",
    //   price: 500,
    //   image: './assets/images/mecha.jpg'
    // },
    // {
    //   id: '6',
    //   name: "Veraniego",
    //   price: 500,
    //   image: './assets/images/veraniego.jpg'
    // },
    // {
    //   id: '7',
    //   name: "Campeon de combate",
    //   price: 500,
    //   image: './assets/images/campeoncombate.jpg'
    // },
  ]

  ngOnInit(): void{
    this.productsServices.getAllProducts().subscribe(data =>{
      this.product2 = data;
    })
  }

  onAddToShoppingCart(product: Product2){
    // this.myShoppingCart.push(product)
    // this.total += product.price;
    // this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price,0);

    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
    console.log(product);
  }
}
