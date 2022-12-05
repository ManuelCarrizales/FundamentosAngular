import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product2 } from 'src/app/models/product2.model';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators'
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']

})
export class CategoryComponent {

  categoryId: string | null = null;
  limit = '10';
  offset = '0';
  products: Product2[] = [];
  productId: string | null = null; 
  constructor(private route: ActivatedRoute, private produtsService: ProductsService){}

  ngOnInit(): void{
    this.route.paramMap
    .pipe(switchMap(params =>{
      this.categoryId = params.get('id');
      if(this.categoryId){
        return this.produtsService.getByCategory(this.categoryId, this.limit, this.offset);
      }
      return [];
    }))
    .subscribe((data) =>{ 
      this.products = data
    })

    this.route.queryParamMap.subscribe(params =>{
      this.productId = params.get('product')
    })
  }

}
