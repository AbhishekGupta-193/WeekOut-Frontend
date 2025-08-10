import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
testimonials = [
    {
      rating: 5,
      text: 'Finally found my weekend adventure crew! Made 3 new friends last month.',
      name: 'Rahul K.',
      role: 'Software Engineer',
    },
    {
      rating: 4,
      text: "From boring weekends to exploring Bangalore's best cafes and trails!",
      name: 'Sneha M.',
      role: 'Marketing Manager',
    },
    {
      rating: 5,
      text: 'The spontaneous plans feature is a game-changer. No more FOMO!',
      name: 'Amit R.',
      role: 'Product Designer',
    },
  ];

  // Generate an array for star icons
  getStars(count: number): number[] {
    return Array(count).fill(0);
  }
}
