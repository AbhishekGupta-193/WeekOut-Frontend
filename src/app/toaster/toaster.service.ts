import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'warning';

export interface ToastMessage {
  type: ToastType;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
 private toastSubject = new Subject<ToastMessage>();
  toastState$ = this.toastSubject.asObservable();

  success(message: string) {
    this.show('success', message);
  }

  error(message: string) {
    this.show('error', message);
  }

  warning(message: string) {
    this.show('warning', message);
  }

  private show(type: ToastType, text: string) {
    this.toastSubject.next({ type, text });
  }
}
