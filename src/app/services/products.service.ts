import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product2 } from '../models/product2.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL = 'https://young-sands-07814.herokuapp.com/api/products';
  constructor(private http:HttpClient) { }

  getAllProducts(){
    return this.http.get<Product2[]>(this.apiURL);
  }

  getProduct(id:string){
    return this.http.get<Product2>(`${this.apiURL}/${id}`);
  }
}