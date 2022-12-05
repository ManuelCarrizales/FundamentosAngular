import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product2 } from 'src/app/models/product2.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  productId: string | null = null;
  product: Product2 | null = null;
  constructor(private route: ActivatedRoute, private productsService: ProductsService, private location: Location){}

  ngOnInit(): void{
    this.route.paramMap
    .pipe(switchMap(params =>{
      this.productId = params.get('id');
      if(this.productId){
        return this.productsService.getProduct(this.productId);
      }
      return [];
    }))
    .subscribe((data) =>{ 
      this.product = data
    })
  }

  goToBack(){
    this.location.back();
  }
}
