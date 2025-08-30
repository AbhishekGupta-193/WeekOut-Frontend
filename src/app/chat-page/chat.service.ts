import { Injectable } from '@angular/core';
import { Client, IMessage, StompSubscription, StompConfig } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApplicationService } from '../application.service';

export interface ChatMessageDTO {
  id?: string;
  planId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private client: Client | null = null;
  private subscriptions = new Map<string, StompSubscription>();
  private messageSubjects = new Map<string, Subject<ChatMessageDTO>>();

  private readonly wsUrl = 'http://localhost:8080/ws'; // SockJS endpoint
  private readonly restBase = 'http://localhost:8080/api/chats';

  constructor(
    private http: HttpClient,
    private applicationService:ApplicationService,
  ) { }

  // connect and subscribe for a specific planId
  connect(planId: string): Observable<ChatMessageDTO> {
    if (!this.messageSubjects.has(planId)) {
      this.messageSubjects.set(planId, new Subject<ChatMessageDTO>());
    }
    const subj = this.messageSubjects.get(planId)!;

    if (!this.client) {
      // build STOMP client using SockJS
      this.client = new Client({
        // we use webSocketFactory for SockJS
        webSocketFactory: () => new SockJS(this.wsUrl),
        reconnectDelay: 5000,
        // debug: (str) => console.log(str),
        onStompError: (frame:any) => console.error('Broker reported error: ' + frame),
      });
      this.client.activate();
    }

    // wait until connected, then subscribe
    const checkAndSubscribe = () => {
      if (!this.client || !this.client.connected) {
        setTimeout(checkAndSubscribe, 100);
        return;
      }
      // if already subscribed, return
      if (this.subscriptions.has(planId)) return;
      const sub = this.client.subscribe('/topic/plans/' + planId, (msg: IMessage) => {
        const payload: ChatMessageDTO = JSON.parse(msg.body);
        subj.next(payload);
      });
      this.subscriptions.set(planId, sub);
    };
    checkAndSubscribe();

    return subj.asObservable();
  }

  disconnect(planId?: string) {
    if (planId && this.subscriptions.has(planId)) {
      this.subscriptions.get(planId)!.unsubscribe();
      this.subscriptions.delete(planId);
      this.messageSubjects.get(planId)?.complete();
      this.messageSubjects.delete(planId);
    }
    // if no planId given, fully deactivate
    if (!planId && this.client) {
      this.client.deactivate();
      this.client = null;
    }
  }

  sendMessage(planId: string, message: ChatMessageDTO) {
    if (!this.client || !this.client.connected) {
      console.error('STOMP client not connected yet');
      return;
    }
    const destination = '/app/chat/' + planId;
    this.client.publish({ destination, body: JSON.stringify(message) });
  }

  // fetch recent history via REST
  loadHistory(planId: string, limit = 100) {
    return this.http.get<ChatMessageDTO[]>(`${this.restBase}/${planId}?limit=${limit}`);
  }
}