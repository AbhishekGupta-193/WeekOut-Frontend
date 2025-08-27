import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationService } from '../application.service';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  constructor(
    private http:HttpClient,
    private applicationService:ApplicationService,
  ) { }

  createPlan(request:any):Observable<any>{
    console.log("createPlan API working");
    return this.http.post(this.applicationService.baseURL+'/plans/create',request);
  }

  getAllPlans():Observable<any>{
    console.log("getAllPlans API working");
    return this.http.get(this.applicationService.baseURL+'/plans/get');
  }

  getPlanById(id:string):Observable<any>{
    console.log("getPlanById API working");
    return this.http.get(this.applicationService.baseURL+`/plans/get/${id}`);
  }
  
  getPlansBasedOnUserInterest(tags: string[]):Observable<any>{
    console.log("getPlansBasedOnInterest API working");
    let params = new HttpParams();
    tags.forEach(tag => {
      params = params.append("tags", tag);
    });
    return this.http.get(this.applicationService.baseURL+'/plans/get',{ params });
  }
  
}
