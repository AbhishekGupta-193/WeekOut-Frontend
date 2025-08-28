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
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { PlanService } from './plan.service';
import { ApplicationService } from '../application.service';
import { LoaderService } from '../loader/loader.service';
import { ToasterService } from '../toaster/toaster.service';

@Component({
  selector: 'app-new-plan',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './new-plan.component.html',
  styleUrl: './new-plan.component.scss'
})
export class NewPlanComponent {

planForm!: FormGroup;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];
  suggestedTags: string[] = [  
  'Travel', 
  'Trek', 
  'Cafe', 
  'Adventure', 
  'Hiking', 
  'Music', 
  'Movie', 
  'Party', 
  'Foodie', 
  'Sports', 
  'Shopping', 
  'Picnic', 
  'Road Trip', 
  'Beach', 
  'Camping', 
  'Fitness', 
  'Gaming', 
  'Photography', 
  'Art & Culture', 
  'Relaxation'
];

  planTypes = [
  'Travel',
  'Trek',
  'Adventure',
  'Nature',
  'Music',
  'Cafe',
  'Food & Dining',
  'Movie & Entertainment',
  'Sports & Fitness',
  'Road Trip',
  'Camping',
  'Beach & Picnic',
  'Art & Culture',
  'Gaming',
  'Workshop & Learning',
  'Party & Nightlife',
  'Relaxation & Wellness'
  ];
  maxPeopleOptions = ['1 person', '2 people', '3 people', '4 people', '5 people', '6 people', '7 people', '8 people', '9 people', '10 people','11 people','12 people'];
  visibilityOptions = ['PUBLIC', 'PRIVATE', 'INVITE_ONLY'];
  loggedInUser: any;
  userData = sessionStorage.getItem('loggedInUser');
  loggedInUserData = this.userData ? JSON.parse(this.userData) : null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private planService: PlanService,
    private applicationService: ApplicationService,
    private loader: LoaderService,
    private toaster: ToasterService,
  ) {}

  ngOnInit(): void {
    this.planForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      maxPeople: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      meetupPoint: ['', Validators.required],
      description: ['', Validators.required],
      tags: [[],Validators.required],
      visibility: ['', Validators.required]
    });

    this.loggedInUser = this.applicationService.loggedInUser || this.loggedInUserData;
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
      this.planForm.get('tags')?.setValue(this.tags);
    }
    if (event.chipInput) {
      event.chipInput.clear();
    }
  }

addEmptyTag(input: HTMLInputElement): void {
  const value = input.value.trim();

  if (value && !this.tags.includes(value)) {
    this.tags.push(value);
    this.planForm.get('tags')?.setValue(this.tags);
  }

  input.value = '';
}

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.planForm.get('tags')?.setValue(this.tags);
    }
  }

  addSuggestedTag(tag: string) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
      this.planForm.get('tags')?.setValue(this.tags);
    }
  }

  onCreatePlanClick() {
    const planData = {
      hostId:this.loggedInUser?.id,
      title: this.planForm.value.title,
      type: this.planForm.value.type,
      date: this.planForm.value.date?.toISOString().split("T")[0],
      time: this.planForm.value.time + ':00',
      meetupPoint: this.planForm.value.meetupPoint,
      description: this.planForm.value.description,
      tags: this.planForm.value.tags,
      maxMembers: this.planForm.value.maxPeople.split(' ')[0],
      visibility: this.planForm.value.visibility,
      EntryMode: 'HOSTED'
    };
    let hostUserId = this.loggedInUser?.id;
    this.loader.display(true);
    this.planService.createPlan(planData,hostUserId).subscribe({
      next:(res:any)=>{
        this.loader.display(false);
        this.toaster.success("Plan Created!");
        this.router.navigate(['dashboard']);
      },
      error:(err:any)=>{
        this.loader.display(false);
        this.toaster.error("Plan Creation Failed. Please try again!");
        console.log(err);
      }
    })
  }

  cancel() {
    this.planForm.reset();
    this.tags = [];
  }

  goBack(){
    this.router.navigate(['/dashboard']);
  }

  goToHomePage(){
    this.router.navigate(['']);
  }
}
