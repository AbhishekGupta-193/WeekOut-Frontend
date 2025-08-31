import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationService } from '../application.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient,
    private applicationService:ApplicationService,
  ) { }

  signIn(credentials:any):Observable<any>{
    console.log("signIn API working");
    return this.http.post(this.applicationService.baseURL+'/auth/login',credentials);
  }
  
  signUp(credentials:any):Observable<any>{
    console.log("signUp API working");
    return this.http.post(this.applicationService.baseURL+'/auth/signup',credentials);
  }
  
  getUserById(id:any):Observable<any>{
    console.log("getUserById API working");
    return this.http.get(this.applicationService.baseURL+`/auth/get/${id}`);
  }
  
  updateUserById(id:any,request:any):Observable<any>{
    console.log("updateUserById API working");
    return this.http.put(this.applicationService.baseURL+`/auth/update/${id}`,request);
  }

}
