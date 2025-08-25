import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterService, ToastMessage } from './toaster.service';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule, NgFor, NgClass],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent {
toasts: ToastMessage[] = [];

  constructor(private toasterService: ToasterService) {}

  ngOnInit() {
    this.toasterService.toastState$.subscribe((toast) => {
      this.toasts.push(toast);

      // Auto remove after 3 seconds
      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t !== toast);
      }, 3000);
    });
  }
}
