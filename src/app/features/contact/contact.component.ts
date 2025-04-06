import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    message: '',
  };

  onSubmit() {
    if (this.contactForm.name && this.contactForm.email && this.contactForm.message) {
      console.log('Contact Form Submitted:', this.contactForm);
      alert('Thank you for your message! We will get back to you soon.');
      this.contactForm = { name: '', email: '', message: '' }; // Reset form
    } else {
      alert('Please fill out all fields.');
    }
  }
}