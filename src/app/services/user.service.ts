import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:string = 'http://localhost:5000/api';

  constructor(private http:HttpClient, private authService:AuthService) { }

  getUserProfil(){
    return this.http.get(this.url+'/user/profil',{
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
    .pipe(map(data=>{
      return JSON.stringify(data)}))
  }

  editUserProfil(data:{userName:string,fullName:string,email:string}){
    return this.http.put(this.url+'/user/profil',data,{
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
    .pipe(map(data=>{
      return JSON.stringify(data)}))
  }
}
