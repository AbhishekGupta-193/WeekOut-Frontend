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
import { Router } from '@angular/router';
import { ApplicationService } from '../application.service';
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
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  constructor(
  private router: Router,
  private applicationService: ApplicationService,
) {}

selectedTab: string = 'plans'; // default tab
loggedInUser: any;
userData = sessionStorage.getItem('loggedInUser');
loggedInUserData = this.userData ? JSON.parse(this.userData) : null;
ngOnInit(){
  this.loggedInUser = this.applicationService.loggedInUser || this.loggedInUserData;
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
    }
  ];

    
  backToDashboard(){
      this.router.navigate(['/dashboard'])
  }
    
  logout(){
    sessionStorage.clear();
    this.router.navigate([''])
  }

}
