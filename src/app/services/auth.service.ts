import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../models/auht.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'https://young-sands-07814.herokuapp.com/api/auth';
  constructor(private http:HttpClient) { }

  login(email:string, password:string){
    return this.http.post<Auth>(`${this.apiURL}/login`,{email,password});
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
