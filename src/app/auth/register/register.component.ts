import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  success: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.error = '';
    this.success = '';

    const username = this.email.split('@')[0];

    const payload = {
      username: username,
      email: this.email,
      password: this.password
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.success = 'Registration successful! You can now login.';
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        if (err.error) {
          this.error = JSON.stringify(err.error);
        } else {
          this.error = 'Registration failed. Please try again.';
        }
        console.error(err);
      }
    });
  }
}
