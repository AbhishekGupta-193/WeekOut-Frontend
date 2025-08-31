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

  createPlan(request:any,hostUserId:any):Observable<any>{
    console.log("createPlan API working");
    return this.http.post(this.applicationService.baseURL+`/plans/create/${hostUserId}`,request);
  }

  joinPlan(planId:any,userId:any):Observable<any>{
    console.log("joinPlan API working");
    return this.http.post(this.applicationService.baseURL+`/plans/${planId}/join/${userId}`,'');
  }

  deletePlan(planId:any):Observable<any>{
    console.log("joinPlan API working");
    return this.http.delete(this.applicationService.baseURL+`/plans/delete/${planId}`);
  }

  getAllPlans():Observable<any>{
    console.log("getAllPlans API working");
    return this.http.get(this.applicationService.baseURL+'/plans/get');
  }

  getPlanById(id:string):Observable<any>{
    console.log("getPlanById API working");
    return this.http.get(this.applicationService.baseURL+`/plans/get/${id}`);
  }

  updatePlanById(request:any,id:string):Observable<any>{
    console.log("updatePlanById API working");
    return this.http.put(this.applicationService.baseURL+`/plans/update/${id}`,request);
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
