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
import { ActivatedRoute, Router } from '@angular/router';
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

  ngOnInit(){
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

  getDays(createdAt:any){
    const createdDate = new Date(createdAt);
    const today = new Date();
    const diffInMs = today.getTime() - createdDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  }

}
