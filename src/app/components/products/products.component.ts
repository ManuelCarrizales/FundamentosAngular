import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product2,UpdateProductDTO } from 'src/app/models/product2.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators'
import { zip } from 'rxjs'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor(private storeService: StoreService,private productsServices: ProductsService){
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  showProductDetail = false;
  productChosen: Product2 = {
    id: '',
      title: '',
      price: 0,
      images: [],
      description: '',
      category: {
        id: '',
        name:''
      },
  };

  limit= 10
  offset=0

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

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
    //Obtener todos los productos
    // this.productsServices.getAllProducts().subscribe(data =>{
    //   this.product2 = data;
    // })
    this.productsServices.getAllProducts(10,0).subscribe(data =>{
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

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id:string){
    this.statusDetail = 'loading';
    this.productsServices.getProduct(id).subscribe(data =>{
      this.toggleProductDetail();
      this.productChosen = data;
      this.statusDetail = 'success';
    }, errorMessage => {
      window.alert(errorMessage);
      this.statusDetail = 'error';
    });
  }

  createNewProduct(){
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'Descripcion',
      images: ['./assets/images/mecha.jpg'],
      price: 8149,
      categoryId: 2,
    }
    this.productsServices.createProduct(product).subscribe(data => {
      console.log('created', data)
    });
  }

  updateProduct(){
    const changes: UpdateProductDTO = {
      title: 'Producto actualizado',
    }
    const id = this.productChosen.id;
    this.productsServices.updateProduct(id, changes).subscribe(data =>{
      console.log('Actualizado', data)
      //actualizar dentro del arreglo.
      const productIndex = this.product2.findIndex(item => item.id === this.productChosen.id);
      this.product2[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsServices.deleteProduct(id).subscribe(() =>{
      const productIndex = this.product2.findIndex(item => item.id === this.productChosen.id);
        this.product2.splice(productIndex,1);
        this.showProductDetail = false;
      })
  }
  loadMore(){
    this.productsServices.getAllProducts(this.limit, this.offset).subscribe(data =>{
      // Se reemplazan los productos ya cargados
      // this.product2 = data; 
      this.product2 = this.product2.concat(data);
      this.offset += this.limit;
    })
  }

  readAndUpdate(id:string){

    //De esta forma se hacen peticiones que dependan
    
    this.productsServices.getProduct(id).pipe(
      switchMap((product) => {
        return this.productsServices.updateProduct(product.id, {title: 'change'})
      })
    ).subscribe(data => {
      console.log(data);
    });

    this.productsServices.fetchReadAndUpdate(id, {title: 'change'}).subscribe(response =>{
      const read = response [0];
      const update = response[1];
    });
  }
}
