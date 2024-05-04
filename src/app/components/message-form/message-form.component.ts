import { Component } from '@angular/core';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.css'
})
export class MessageFormComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: number | null = null;
  message: string = '';

  handleMessage() {
    console.log('Message submitted:', this.firstName, this.lastName, this.email, this.phone, this.message);
    this.resetForm();
  }
  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = null;
    this.message = '';
  }

}
