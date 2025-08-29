import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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

    this.authService.register(this.email, this.password).subscribe({
      next: (res) => {
        this.success = 'Registration successful! You can now login.';
      },
      error: (err) => {
        this.error = 'Registration failed. Please try again.';
        console.error(err);
      }
    });
  }
}
