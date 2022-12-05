import { Component } from '@angular/core';
import { Product } from './product.model';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { Auth } from './models/auht.model';
import { FilesService } from './services/files.service';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService: AuthService, private usersService: UsersService, private fileService: FilesService){}
  //Guardar archivos
  imgRta='';
  downloadPdf(){
    this.fileService.getFile('my.pdf','http://www.ataun.eus/bibliotecagratuita/Cl%C3%A1sicos%20en%20Espa%C3%B1ol/Federico%20Garc%C3%ADa%20Lorca/El%20p%C3%BAblico.pdf','application/pdf')
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.fileService.uploadFile(file).subscribe(rta => {
        this.imgRta = rta.location;
      })
    }
  }

  //ANGULAR: COMPONENTES Y SERVICIOS
  imgParent = ''
  showImg = true;
  token = '';
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

  createUser(){
    this.usersService.create({
      name: 'Manuel',
      email: 'manuel@gmail.com',
      password: '1212'
    }).subscribe(rta =>{
      console.log(rta)
    })
  }

}
