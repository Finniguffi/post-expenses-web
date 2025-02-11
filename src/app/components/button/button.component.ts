import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, DollarSign, MinusCircle } from 'lucide-angular';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
})
export class ButtonComponent {
  @Input() type: string = 'button';
  @Input() label: string = '';
  @Input() variant: 'default' | 'expenses' | 'earnings' = 'default';

  // Icons
  readonly DollarSign = DollarSign;
  readonly MinusCircle = MinusCircle;
}