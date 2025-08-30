import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NewPlanComponent } from './new-plan/new-plan.component';
import { PlanPageComponent } from './plan-page/plan-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ToasterComponent } from './toaster/toaster.component';
import { LoaderComponent } from './loader/loader.component';
import { ChatPageComponent } from './chat-page/chat-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AuthComponent,
    HomePageComponent,
    NewPlanComponent,
    PlanPageComponent,
    ProfilePageComponent,
    ToasterComponent,
    LoaderComponent,
    ChatPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Weekout-Fontend';
}
