import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';

@Component({
  selector: 'app-balance-display',
  templateUrl: './balance-display.component.html',
  styleUrls: ['./balance-display.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  animations: [
    trigger('toggleBalance', [
      state('hidden', style({
        opacity: 0,
        height: '0px'
      })),
      state('visible', style({
        opacity: 1,
        height: '*'
      })),
      transition('hidden <=> visible', [
        animate('0.5s ease-in-out')
      ])
    ])
  ]
})
export class BalanceDisplayComponent {
  @Input() balance: number = 0;
  showBalance: boolean = false;

  // Icons
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  toggleBalanceVisibility(): void {
    this.showBalance = !this.showBalance;
  }
}