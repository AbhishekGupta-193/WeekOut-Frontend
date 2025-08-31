import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthComponent } from './auth/auth.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { NewPlanComponent } from './new-plan/new-plan.component';
import { PlanPageComponent } from './plan-page/plan-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ChatPageComponent } from './chat-page/chat-page.component';


export const routes: Routes = [
  { path: '', component: HomePageComponent },   // Homepage
  { path: 'login', component: AuthComponent },  // Login page
  { path: 'dashboard', component: DashBoardComponent },  // Login page
  { path: 'create-plan', component: NewPlanComponent },  // create plan page
  { path: 'plan/:id', component: PlanPageComponent },  // plan page
  { path: 'profile', component: ProfilePageComponent },  // profile page
  { path: 'profile/:id', component: ProfilePageComponent },  // profile page with id
  { path: 'chat/:id', component: ChatPageComponent },  // plan page
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];
