import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Auth } from '../models/auht.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'https://young-sands-07814.herokuapp.com/api/auth';
  constructor(private http:HttpClient, private tokenService: TokenService) { }

  login(email:string, password:string){
    return this.http.post<Auth>(`${this.apiURL}/login`,{email,password}).pipe(tap(response => this.tokenService.getToken()));
  }
  profile(token: string){
    // const headers = new HttpHeaders
    // headers.set('Authorization',`Bearer ${token}`)
    return this.http.get<User>(`${this.apiURL}/profile`,{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
  }
}
