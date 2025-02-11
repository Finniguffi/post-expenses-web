import { Component, OnInit } from '@angular/core';
import { BalanceContextService } from '../../services/authenticated/balance/balance.context';
import { BalanceDisplayComponent } from '../../components/balance-display/balance-display.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [BalanceDisplayComponent, ButtonComponent]
})
export class HomeComponent implements OnInit {
  balance: number = 0;

  constructor(private balanceContextService: BalanceContextService) {}

  ngOnInit(): void {
    this.balanceContextService.balance$.subscribe({
      next: (balance) => {
        if (balance !== null) {
          this.balance = balance;
        }
      },
      error: (err) => console.error('Failed to fetch balance:', err),
    });
  }
}