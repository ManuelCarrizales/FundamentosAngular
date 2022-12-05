import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product2 } from 'src/app/models/product2.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  products: Product2[] = [];
  limit = 10;
  offset = 0;
  productId: string | null = null;

  constructor(private productsServices: ProductsService, private route:ActivatedRoute){}

  ngOnInit(): void{
    //Obtener todos los productos
    // this.productsServices.getAllProducts().subscribe(data =>{
    //   this.product2 = data;
    // })
    this.productsServices.getAllProducts(10,0).subscribe(data =>{
      this.products = data;
    })
    //Para hacer compartido el producto
    this.route.queryParamMap.subscribe(params =>{
      this.productId = params.get('product')
    })
  }

  onLoadMore(){
    this.productsServices.getAllProducts(this.limit, this.offset).subscribe(data=>{
      this.products = this.products.concat(data);
      this.offset += this.limit;
    })
  }
}
