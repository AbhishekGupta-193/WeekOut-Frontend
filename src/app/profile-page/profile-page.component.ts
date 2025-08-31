import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
import { ApplicationService } from '../application.service';
import {ChangeDetectionStrategy, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { ToasterService } from '../toaster/toaster.service';
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
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
  profileForm: FormGroup;

constructor(
  private router: Router,
  private applicationService: ApplicationService,
  private fb: FormBuilder,
  private cdr: ChangeDetectorRef,
  private route: ActivatedRoute,
  private authService: AuthService,
  private toaster: ToasterService,
) {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      interests: this.fb.array(
        this.interestsList.map(() => this.fb.control(false)),
        this.minSelectedCheckboxes(1)
      ),
    });
}
updateInsterestClicked = false;
selectedTab: string = 'plans'; // default tab
loggedInUser: any;
profileId: any;
updatedInterests: any;
userInterests: any;
userData = sessionStorage.getItem('loggedInUser');
loggedInUserData = this.userData ? JSON.parse(this.userData) : null;
profileData:any;

ngOnInit(){
  this.loggedInUser = this.applicationService.loggedInUser || this.loggedInUserData;
  this.profileId = this.route.snapshot.paramMap.get('id');
  this.onLandingToProfile();
}

  // Custom validator: at least min required checkboxes selected
  minSelectedCheckboxes(min = 1): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control instanceof FormArray)) {
        // If control is not a FormArray, we can't validate, so return null
        return null;
      }
      const totalSelected = control.controls
        .map(ctrl => ctrl.value)
        .reduce((prev, next) => (next ? prev + 1 : prev), 0);

      return totalSelected >= min ? null : { required: true };
    };
  }

  get signupInterestsControls() {
    return (this.profileForm.get('interests') as FormArray).controls;
  }
  

  plans = [
    { title: 'Weekend Trek to Nandi Hills', date: 'Sat, Aug 9, 2025' },
    { title: 'Foodie Walk in Bangalore', date: 'Sun, Aug 10, 2025' }
  ];

  badges = [
    { title: 'Early Bird', desc: 'Always on time', icon: 'alarm' },
    { title: 'Foodie', desc: 'Hosted 5 food plans', icon: 'restaurant' },
    { title: 'Explorer', desc: 'Visited 10 new places', icon: 'explore' },
    { title: 'Social Butterfly', desc: 'Made 20+ connections', icon: 'group' },
    { title: 'Weekend Warrior', desc: 'Active every weekend', icon: 'bolt' }
  ];

  interests = ['Food & Drinks', 'Outdoor Adventures'];

  reviews = [
    {
      name: 'Priya Sharma',
      initial: 'P',
      stars: 5,
      review: 'Great host! The brunch plan was perfectly organized and everyone had a wonderful time.',
      timeAgo: '3 days ago'
    },
    {
      name: 'John Doe',
      initial: 'J',
      stars: 4,
      review: 'Cannot be more perfect then this!',
      timeAgo: '7 days ago'
    },
  ];

  readonly dialog = inject(MatDialog);

  openDialog(templateRef: any) {
    const dialogRef = this.dialog.open(templateRef,{
      height:'600px',
      width:'500px',
      panelClass: 'profile-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  backToDashboard(){
      this.router.navigate(['/dashboard'])
  }
    
  logout(){
    sessionStorage.clear();
    this.router.navigate([''])
  }

  onSignupSubmit(){

  }

  onLandingToProfile(){
    if(this.profileId == null){
      this.toaster.error('Failed to fetch Profile Id.')
      return;
    }
    this.authService.getUserById(this.profileId).subscribe({
      next:(res:any)=>{
        this.profileData = res;
        this.userInterests = this.profileData?.interests;
        this.updatedInterests = [...this.userInterests];
      },
      error:(err:any)=>{
        this.toaster.error('Failed to fetch Profile Data.Please try again!')
      }
    })
  }

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
    if(this.profileData?.id !== loggedUser?.id){
      this.toaster.warning(`You are not authorized to edit other user's interests`);
      return;
    }
    if(this.updatedInterests.length > 0){
      this.authService.updateUserById(userId,request).subscribe({
        next:(res:any)=>{
          this.toaster.success('Interests updated successfully. (Note: Changes will be visible after Refresh)');
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
