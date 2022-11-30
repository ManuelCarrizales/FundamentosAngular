import { Component } from '@angular/core';
import { Product } from './product.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //ANGULAR: COMPONENTES Y SERVICIOS
  imgParent = ''
  showImg = true;
  onLoaded(img: string){
    console.log('Log padre', img);
  }
  toggleImg(){
    this.showImg = !this.showImg;
  }

  //FUNDAMENTOS DE ANGULAR
  register = {
    name: '',
    email: '',
    password:'',
  }
  widthImg = 10;
  name = 'Manuel'
  age = 23
  img = 'https://bolavip.com/export/sites/bolavip/img/2020/01/06/settcallingcard.png_1774878675.png'
  btnDisable = true
  person = {
    name: 'Manuel',
    age: 23,
    img: 'https://bolavip.com/export/sites/bolavip/img/2020/01/06/settcallingcard.png_1774878675.png',
  }
  names = ['Manuel', 'Edson', 'Ian'];
  newName = '';
  box = {
    width: 100,
    height: 100,
    background: 'red'
  }
  products: Product[] = [
    {
      name: "Original",
      price: 500,
      image: './assets/images/original.jpg',
      category: 'Legacy',
    },
    {
      name: "Dragon Obsidiana",
      price: 500,
      image: './assets/images/dragonobsidiana.jpg'
    },
    {
      name: "Dragon Obsidiana Prestigiosa",
      price: 500,
      image: './assets/images/dragonobsidianaprestigiosa.jpg',
      category: "Premium",
    },
    {
      name: "Flor Espiritual",
      price: 500,
      image: './assets/images/florespiritual.jpg'
    },
    {
      name: "Mecha",
      price: 500,
      image: './assets/images/mecha.jpg'
    },
    {
      name: "Veraniego",
      price: 500,
      image: './assets/images/veraniego.jpg'
    },
    {
      name: "Campeon de combate",
      price: 500,
      image: './assets/images/campeoncombate.jpg'
    },
  ]

  toggleButton(){
    this.btnDisable = !this.btnDisable;
  }
  edadMasUno(){
    this.person.age++;
  }

  onScroll(event: Event){
    const element = event.target as HTMLElement;
    console.log(element.scrollTop)
  }

  changeName(event: Event){
    const element = event.target as HTMLInputElement;
    this.person.name = element.value;
  }

  addName(){
    this.names.push(this.newName);
    this.newName = '';
  }
  deleteName(index: number){
   this.names.splice(index,1) ;
  }

  onRegister(){
    console.log(this.register);
  }
}
