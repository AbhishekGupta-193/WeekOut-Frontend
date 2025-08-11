import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent {
  // planTypes = new FormControl('');
  planTypes = new FormControl<string[]>([]);

  planList: string[] = ['All Types', 'Trek', 'Entertainment', 'Nature', 'Cafe', 'Indoor', 'Party'];
ngOnInit() {
  this.planTypes.setValue(['All Types']); // default
}
  activeTab: 'explore' | 'forYou' | 'nearby' = 'explore';

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
}
