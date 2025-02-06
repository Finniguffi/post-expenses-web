import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { AuthContextService } from '../../services/auth.context';
import { LoginRequest } from '../../model/auth.model';
import { ToastComponent } from '../../components/toast/toast.component';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { ERROR_MESSAGES, SCREENS, SUCCESSFUL_MESSAGES } from '../../utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, ToastComponent, InputComponent, ButtonComponent],
})
export class LoginComponent {
  credentials: LoginRequest = { email: '', password: '' };
  errorMessage: string | null = null;

  constructor(
    private authContextService: AuthContextService,
    private toastService: ToastService,
    private router: Router
  ) {}

  private redirectToHome = () => {
    this.router.navigate([`/${SCREENS.HOME}`]);
  };

  login() {
    this.authContextService.login(this.credentials).subscribe({
      next: () => {
        this.redirectToHome();
        this.toastService.show(SUCCESSFUL_MESSAGES.LOGIN);
      },
      error: () => {
        this.errorMessage = ERROR_MESSAGES.INVALID_CREDENTIALS;
        this.toastService.show(this.errorMessage);
      },
    });
  }
}