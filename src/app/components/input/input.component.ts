import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() model: any;
  @Input() name: string = '';
}