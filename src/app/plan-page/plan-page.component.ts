import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlanService } from '../new-plan/plan.service';
import { ApplicationService } from '../application.service';
import { LoaderService } from '../loader/loader.service';
import { ToasterService } from '../toaster/toaster.service';
@Component({
  selector: 'app-plan-page',
  standalone: true,
  imports: [
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './plan-page.component.html',
  styleUrl: './plan-page.component.scss'
})
export class PlanPageComponent {
  constructor(
  private router: Router,
  private planService: PlanService,
  private applicationService: ApplicationService,
  private loader: LoaderService,
  private toaster: ToasterService,
  private route: ActivatedRoute,
) {}

  planPageData:any;
  planId:any;
  loggedInUser: any;
  userData = sessionStorage.getItem('loggedInUser');
  loggedInUserData = this.userData ? JSON.parse(this.userData) : null;
  ngOnInit(){
    this.loggedInUser = this.applicationService.loggedInUser || this.loggedInUserData;
    this.planId = this.route.snapshot.paramMap.get('id');
    this.getPlanPageDetails();  
  }

  backToDashboard(){
    this.router.navigate(['/dashboard'])
  }

  getPlanPageDetails() {
    const id = this.planId;
    this.loader.display(true);
    this.planService.getPlanById(id).subscribe({
      next:(res:any)=>{
        this.loader.display(false);
        this.planPageData = res;
      },
      error:(err:any)=>{
        this.loader.display(false);
        this.toaster.error("Unable to fetch Plans Data. Please refresh and try again!");
        console.log(err);
      }
    })
  }

  canJoin(plan: any, userId: string): boolean {
  // Check host
  if (plan.hostUser?.id === userId) {
    return false;
  }
  // Check joined users
  const alreadyJoined = plan.joinedUsers?.some((u: any) => u.id === userId);
  if (alreadyJoined) {
    return false;
  }
  return true;
}

  onPlanJoinClick() {
    const planId = this.planId;
    let userId = this.loggedInUser?.id;
    this.loader.display(true);
    if(this.canJoin(this.planPageData,userId)){
      this.planService.joinPlan(planId,userId).subscribe({
        next:(res:any)=>{
          this.loader.display(false);
          this.toaster.success("Plan joined successfully.");
        },
        error:(err:any)=>{
          this.loader.display(false);
          this.toaster.error("Failed to join plan. Please try again!");
          console.log(err);
        }
      })
    }else{
      this.loader.display(false);
      this.toaster.warning("You have already joined this plan.");
    }
  }

  hasUserRightToDelete(){
    let flag = false;
    let planHostId = this.planPageData?.hostId;
    let userId = this.loggedInUser?.id;
    if(userId == planHostId)flag=true;
    return flag;
  }

  onDeletePlanClick() {
    const id = this.planId;
    const confirmDelete = confirm("Are you sure you want to delete this plan?");
    if (!confirmDelete) {
      return; // abort if user clicks 'Cancel'
    }
    this.loader.display(true);
    this.planService.deletePlan(id).subscribe({
      next:(res:any)=>{
        this.loader.display(false);
        this.toaster.error("Plan deleted successfully.");
      },
      error:(err:any)=>{
        this.loader.display(false);
        this.toaster.error("Failed to delete Plan Data. Please try again!");
        console.log(err);
      }
    })
  }

  getDays(createdAt:any){
    const createdDate = new Date(createdAt);
    const today = new Date();
    const diffInMs = today.getTime() - createdDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  }

  getAvailableSpots(plan: any): any[] {
    const taken = (plan.joinedUsers?.length || 0) + 1; // joined users + host
    const available = plan.maxMembers - taken;
    return Array(available > 0 ? available : 0); 
  }
}
