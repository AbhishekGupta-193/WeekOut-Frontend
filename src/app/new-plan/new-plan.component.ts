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
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-plan',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './new-plan.component.html',
  styleUrl: './new-plan.component.scss'
})
export class NewPlanComponent {

planForm!: FormGroup;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];
  suggestedTags: string[] = ['Trek', 'Cafe', 'Adventure', 'Hiking', 'Music'];

  planTypes = ['Trek', 'Nature', 'Music', 'Cafe', 'Adventure'];
  maxPeopleOptions = ['1 person', '2 people', '3 people', '4 people', '5+ people'];
  visibilityOptions = ['Public', 'Private', 'Invite'];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.planForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      maxPeople: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      meetupPoint: ['', Validators.required],
      description: ['', Validators.required],
      tags: [[]],
      visibility: ['', Validators.required]
    });
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
    }
    if (event.chipInput) {
      event.chipInput.clear();
    }
  }

addEmptyTag(input: HTMLInputElement): void {
  const value = input.value.trim();

  if (value && !this.tags.includes(value)) {
    this.tags.push(value);
  }

  input.value = '';
}

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  addSuggestedTag(tag: string) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  createPlan() {
    if (this.planForm.valid) {
      console.log('Plan Created:', { ...this.planForm.value, tags: this.tags });
    }
  }

  cancel() {
    this.planForm.reset();
    this.tags = [];
  }

  goBack(){
    this.router.navigate(['/dashboard']);
  }

  goToHomePage(){
    this.router.navigate(['']);
  }
}
