import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model'; 
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  activeMenu = false;
  counter = 0;
  token = '';
  profile: User | null = null;
  categories: Category[] = [];

  constructor(private storeService: StoreService,  private authService: AuthService, private categoryService: CategoriesService){

  }

  ngOnInit(): void{
    this.storeService.myCart$.subscribe(products =>{
      this.counter = products.length;
    });
   this.getAllCategories();
  }
  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.login('manuel@gmail.com','1212').subscribe(rta =>{
      this.token = rta.access_token;
      console.log(this.token);
      this.getProfile();
    }) 
  }

  getProfile(){
    this.authService.profile(this.token).subscribe(user =>{
      this.profile = user;
    });
  }

  getAllCategories(){
    this.categoryService.getAll().subscribe(data =>{
      this.categories = data
    });
  }
}
