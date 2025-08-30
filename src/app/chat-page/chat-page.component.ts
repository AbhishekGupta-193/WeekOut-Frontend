import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ChatService } from './chat.service';
import { ChatMessageDTO } from './chat.service';
import { ApplicationService } from '../application.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoaderService } from '../loader/loader.service';
import { PlanService } from '../new-plan/plan.service';
import { ToasterService } from '../toaster/toaster.service';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,MatIconModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent implements OnInit, OnDestroy {
  loggedInUser: any;
  userData = sessionStorage.getItem('loggedInUser');
  loggedInUserData = this.userData ? JSON.parse(this.userData) : null;
  
  messages: ChatMessageDTO[] = [];
  text = '';
  
  private sub?: Subscription;
  
  constructor(
    private chat: ChatService,
    private applicationService:ApplicationService,
    private route:ActivatedRoute,
    private router:Router,
    private loader:LoaderService,
    private planService:PlanService,
    private toaster:ToasterService,
  ) {}
  
  planId :any; 
  planPageData :any; 
  ngOnInit() {
    this.loggedInUser = this.applicationService.loggedInUser || this.loggedInUserData;
    this.planId = this.route.snapshot.paramMap.get('id');
    this.getPlanPageDetails();
    // 1) load recent history (REST)
    this.chat.loadHistory(this.planId, 200).subscribe(history => {
      this.messages = history;
      // scroll if needed
    });
    
    
    // 2) connect & subscribe (websocket)
    const obs = this.chat.connect(this.planId);
    this.sub = obs.subscribe((m) => {
      this.messages.push(m);
    });
  }

  send() {
    if (!this.text?.trim()) return;

    const dto: ChatMessageDTO = {
      planId: this.planId,
      senderId:this.loggedInUser?.id,
      senderName: this.loggedInUser?.name,
      content: this.text,
      // id/timestamp will be filled by server
    };
    this.chat.sendMessage(this.planId, dto);
    this.text = '';
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.chat.disconnect(this.planId);
  }

  onBackClick(){
    this.router.navigate(['dashboard'])
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
}
