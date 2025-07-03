import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface TeamMember {
  name: string;
  position: string;
  image: string;
}

interface CompanyValue {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  teamMembers: TeamMember[] = [
    {
      name: 'John Doe',
      position: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Jane Smith',
      position: 'Operations Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Mike Johnson',
      position: 'Quality Control Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  companyValues: CompanyValue[] = [
    {
      title: 'Quality First',
      description: 'We never compromise on the quality of our products',
      icon: 'bi bi-award'
    },
    {
      title: 'Customer Focus',
      description: 'Your satisfaction is our top priority',
      icon: 'bi bi-people'
    },
    {
      title: 'Innovation',
      description: 'Constantly evolving to meet market demands',
      icon: 'bi bi-lightbulb'
    },
    {
      title: 'Sustainability',
      description: 'Committed to environmentally responsible practices',
      icon: 'bi bi-globe'
    }
  ];
}
