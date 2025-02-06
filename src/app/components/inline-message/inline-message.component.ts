import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inline-message',
  templateUrl: './inline-message.component.html',
  styleUrls: ['./inline-message.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class InlineMessageComponent {
  @Input() message: string = '';
  @Input() variant: 'info' | 'error' | 'warn' | 'success' = 'info';
}