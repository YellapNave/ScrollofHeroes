import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  date: Date;

  add(message: string) {
    this.date = new Date();
    let options = {
      timeZoneName: 'short',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
      second: '2-digit'
    }
    this.messages.push(
      `[${this.date.toLocaleTimeString('en-US', options)}] ${message}`
      );
  }

  clear() {
    this.messages = [];
  }
}
