import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Product2, CreateProductDTO, UpdateProductDTO } from '../models/product2.model';
import { retry, catchError, map } from 'rxjs/operators'
import { throwError, zip } from 'rxjs'
import { checkTime } from '../interceptors/time.interceptor';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL = 'https://young-sands-07814.herokuapp.com/api';
  constructor(private http:HttpClient) { }

  getAllProducts(limit?:number, offset?: number){
    let params = new HttpParams();
    if( limit && offset){
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.http.get<Product2[]>(`${this.apiURL}/products`,{ params, context: checkTime() }).pipe((retry(3),map(products => products.map(item => {
      return {
        ...item,
        taxes: .19 * item.price
      }
    }))));
  }

  getProduct(id:string){
    return this.http.get<Product2>(`${this.apiURL}/products/${id}`)
    .pipe(catchError((error: HttpErrorResponse) =>{
      if(error.status === HttpStatusCode.Conflict){
        return throwError(() => new Error('Ups algo salio mal'))
      }
      if(error.status === HttpStatusCode.NotFound){
        return throwError(() => new Error('El producto no existe'))
      }
      if(error.status === HttpStatusCode.Unauthorized){
        return throwError(() => new Error('No estas autorizado'))
      }
      return throwError(() => new Error('Ups algo salio mal'))
    }));
  }

  //dto : data transfer object
  createProduct(dto: CreateProductDTO){
    return this.http.post<CreateProductDTO>(`${this.apiURL}/products`,dto);
  }

  //Put se envia toda la información completa para hacer la actualización
  //Patch este solo se envie el/los atributos que se cambian en la actualización
  updateProduct(id:string ,dto: any){
    return this.http.put<Product2>(`${this.apiURL}/products/${id}`, dto)
  }

  deleteProduct(id:string){
    return this.http.delete<boolean>(`${this.apiURL}/products/${id}`);
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO){
    //Este se usa para hacer 2 peticiones al mismo tiempo
    return zip(
      this.getProduct(id),
      this.updateProduct(id, dto)
    );
  }

  getByCategory(categoryId: string, limit?:string, offset?:string){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product2[]>(`${this.apiURL}/categories/${categoryId}/products`,{params});
  }

}
