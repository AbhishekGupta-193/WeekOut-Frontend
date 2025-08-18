import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthComponent } from './auth/auth.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { NewPlanComponent } from './new-plan/new-plan.component';
import { PlanPageComponent } from './plan-page/plan-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },   // Homepage
  { path: 'login', component: AuthComponent },  // Login page
  { path: 'dashboard', component: DashBoardComponent },  // Login page
  { path: 'create-plan', component: NewPlanComponent },  // create plan page
  { path: 'plan', component: PlanPageComponent },  // create plan page
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];
