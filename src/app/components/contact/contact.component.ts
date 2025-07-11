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
    address: 'OFFICE 107, 1ST FLOOR, ALFUTAIM BLDG, REGUS DEIRA CITY CENTRE, DEIRA, DUBAI, UAE',
    phone: '+971 XX XXX XXXX',
    email: 'info@zahratalfajr.com',
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
