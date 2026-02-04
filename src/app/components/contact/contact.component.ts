import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactInfo = {
    address: 'FZ MEYDAN GRANDSTAND 6TH FLOOR, MEYDAN ROAD NAD AL SHEBA, DUBAI U.A.E',
    phone: '+971 56 357 9348',
    email: 'info@laraibfoodstuff.com',
    workingHours: 'Monday - Friday: 9:00 AM - 6:00 PM'
  };

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    // Here you would typically handle the form submission
    console.log('Form submitted:', this.formData);
    // Reset form
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
