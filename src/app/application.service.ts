import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  loggedInUser:any;
  constructor() { }
  baseURL:string = "http://localhost:8080/api";
}
