import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ApplicationService } from '../application.service';
import { PlanService } from '../new-plan/plan.service';
import { AuthService } from '../auth/auth.service';
import { LoaderService } from '../loader/loader.service';
import { ToasterService } from '../toaster/toaster.service';
import { RouterModule } from '@angular/router';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SearchFilterPipe,
    GoogleMapsModule
  ],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent {
  constructor(
    private router: Router,
    private applicationService: ApplicationService,
    private planService: PlanService,
    private loader: LoaderService,
    private toaster: ToasterService,
    private authService: AuthService,
  ) {}
  
  userName:any;
  loggedUserId:any;
  userInterests:any;
  updatedInterests:any;
  searchText: string = '';
  // planTypes = new FormControl('');
  planTypes = new FormControl<string[]>([]);
  interestsList = [
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
  planList: string[] = [
  'All Types',
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

  userData = sessionStorage.getItem('loggedInUser');
  loggedInUserData = this.userData ? JSON.parse(this.userData) : null;
  center: google.maps.LatLngLiteral = { lat: 12.9716, lng: 77.5946 }; // Bengaluru
  
  ngOnInit() {
  this.userName = (this.applicationService.loggedInUser || this.loggedInUserData)?.name;
  this.loggedUserId = (this.applicationService.loggedInUser || this.loggedInUserData)?.id;
  this.userInterests = (this.applicationService.loggedInUser || this.loggedInUserData)?.interests;
  this.updatedInterests = [...this.userInterests];
  this.planTypes.setValue(['All Types']); // default
  this.getAllPlansToExplore();
  this.activeTab = 'explore'
}
  activeTab: 'explore' | 'forYou' | 'nearby' = 'explore';

  allPlansToExplore: any;
  allPlansForYou: any;
  explorePlans = [
    {
      id: 1,
      title: 'Weekend Trek to Nandi Hills',
      type: 'Trek',
      date: '09-04-2025',
      time: '06:20',
      location: 'Majestic Bus Stand',
      tags: ['Adventure', 'Photography', 'Nature'],
      host: 'Rahul Sharma',
      hostInitial: 'R',
      people: '6/8',
      icon: 'fa-mountain',
      joined: false,
    },
    {
      id: 2,
      title: 'Evening Cafe Meetup',
      type: 'Cafe',
      date: '09-04-2025',
      time: '06:20',
      location: 'Indiranagar',
      tags: ['Coffee', 'Friends'],
      host: 'Rahul Sharma',
      hostInitial: 'R',
      people: '3/5',
      icon: 'fa-mug-hot',
      joined: false,
    },
    {
      id: 1,
      title: 'Weekend Trek to Nandi Hills',
      type: 'Trek',
      date: '09-04-2025',
      time: '06:20',
      location: 'Majestic Bus Stand',
      tags: ['Adventure', 'Photography', 'Nature'],
      host: 'Rahul Sharma',
      hostInitial: 'R',
      people: '6/8',
      icon: 'fa-mountain',
      joined: false,
    },
    {
      id: 2,
      title: 'Evening Cafe Meetup',
      type: 'Cafe',
      date: '09-04-2025',
      time: '06:20',
      location: 'Indiranagar',
      tags: ['Coffee', 'Friends'],
      host: 'Rahul Sharma',
      hostInitial: 'R',
      people: '3/5',
      icon: 'fa-mug-hot',
      joined: false,
    },
    {
      id: 1,
      title: 'Weekend Trek to Nandi Hills',
      type: 'Trek',
      date: '09-04-2025',
      time: '06:20',
      location: 'Majestic Bus Stand',
      tags: ['Adventure', 'Photography', 'Nature'],
      host: 'Rahul Sharma',
      hostInitial: 'R',
      people: '6/8',
      icon: 'fa-mountain',
      joined: false,
    },
    {
      id: 2,
      title: 'Evening Cafe Meetup',
      type: 'Cafe',
      date: '09-04-2025',
      time: '06:20',
      location: 'Indiranagar',
      tags: ['Coffee', 'Friends'],
      host: 'Rahul Sharma',
      hostInitial: 'R',
      people: '3/5',
      icon: 'fa-mug-hot',
      joined: false,
    },
  ];

  nearbySpots = [
    { name: 'Cubbon Park', distance: '2.4 Km', tags: ['Nature'], rating: 4.5, icon: 'fa-tree' },
    { name: 'Lalbagh Botanical Garden', distance: '3.2 Km', tags: ['Nature', 'Flowers'], rating: 4.7, icon: 'fa-leaf' },
    { name: 'Cubbon Park', distance: '2.4 Km', tags: ['Nature'], rating: 4.5, icon: 'fa-tree' },
    { name: 'Lalbagh Botanical Garden', distance: '3.2 Km', tags: ['Nature', 'Flowers'], rating: 4.7, icon: 'fa-leaf' },
    { name: 'Cubbon Park', distance: '2.4 Km', tags: ['Nature'], rating: 4.5, icon: 'fa-tree' },
    { name: 'Lalbagh Botanical Garden', distance: '3.2 Km', tags: ['Nature', 'Flowers'], rating: 4.7, icon: 'fa-leaf' },
  ];


  setActiveTab(tab: 'explore' | 'forYou' | 'nearby') {
    this.activeTab = tab;
  }

  joinPlan(plan: any) {
    plan.joined = true;
  }

  goToCreatePlanPage(){
    this.router.navigate(['/create-plan']);
  }
  
  goToHomePage(){
    this.router.navigate(['']);
  }
  
  goToPlanPage(){
    this.router.navigate(['/plan']);
  }

  goToUserProfile(){
    this.router.navigate(['/profile']);
  }

  getAllPlansToExplore() {
    this.loader.display(true);
    this.planService.getAllPlans().subscribe({
      next:(res:any)=>{
        this.loader.display(false);
        this.allPlansToExplore = res;
      },
      error:(err:any)=>{
        this.loader.display(false);
        this.toaster.error("Unable to fetch Plans. Please refresh and try again!");
        console.log(err);
      }
    })
  }

  getAllPlansForYou() {
    const planTags = (this.applicationService.loggedInUser || this.loggedInUserData)?.interests;
    this.loader.display(true);
    this.planService.getPlansBasedOnUserInterest(planTags).subscribe({
      next:(res:any)=>{
        this.loader.display(false);
        this.allPlansForYou = res;
      },
      error:(err:any)=>{
        this.loader.display(false);
        this.toaster.error("Unable to fetch User Specific Plans. Please try again!");
        console.log(err);
      }
    })
  }

  getPlanHost(hostId:any){
    let hostName = '';
    this.authService.getUserById(hostId).subscribe({
      next:(res:any)=>{
        hostName = res.name;
        return hostName;
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
  
  getPlanHostInitial(hostId:any){
    let hostName = '';
    this.authService.getUserById(hostId).subscribe({
      next:(res:any)=>{
        hostName = res.name;
        return hostName[0];
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  updateInsterestClicked = false;
  onUpdateInterestsClick(){
    this.updateInsterestClicked = true;
  }
  onCancelChanges(){
    this.updateInsterestClicked = false;
  }
  onSaveChanges(){
    let loggedUser = (this.applicationService.loggedInUser || this.loggedInUserData)
    let request={
      name : loggedUser?.name,
      email : loggedUser?.email,
      phoneNumber : loggedUser?.phoneNumber,
      profilePictureUrl : loggedUser?.profilePictureUrl,
      bio : loggedUser?.bio,
      interests : this.updatedInterests,
    };
    let userId = loggedUser?.id;
    if(this.updatedInterests.length > 0){
      this.authService.updateUserById(userId,request).subscribe({
        next:(res:any)=>{
          this.toaster.success('Interests updated successfully. (Note: Changes will be visible after Relogin)');
          this.userInterests = this.updatedInterests;
          this.updateInsterestClicked = false;
        },
        error:(err:any)=>{
          this.toaster.error('Failed to update interests. Please try again.')
          console.log(err);
        }
      })
    }else{
      this.toaster.warning('Please select at least one interest.')
      return;
    }
  }

  onInterestChange(event: Event, interest: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (!this.updatedInterests.includes(interest)) {
        this.updatedInterests.push(interest);
      }
    } else {
      this.updatedInterests = this.updatedInterests.filter((item: any) => item !== interest);
    }
  }
}
