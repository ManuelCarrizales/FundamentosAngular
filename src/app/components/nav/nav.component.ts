import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(private storeService: StoreService,  private authService: AuthService,){

  }

  ngOnInit(): void{
    this.storeService.myCart$.subscribe(products =>{
      this.counter = products.length;
    });
   
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

}
