import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Called when user submits the login form
  login(): void {
    this.error = ''; // Reset error

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        // Login successful, navigate to dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // Login failed
        this.error = 'Invalid email or password';
        console.error(err);
      }
    });
  }
}
