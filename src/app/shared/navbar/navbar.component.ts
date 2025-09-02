import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;  
  userName: string = '';  

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.updateLoginStatus();
    this.authService.isLoggedIn$.subscribe(status => {
    this.isLoggedIn = status;
    });
    const storedName = sessionStorage.getItem('username');
    this.userName = storedName ? storedName : '';
  }

   logout() {
    this.authService.logout();
    this.userName = "";
    this.router.navigateByUrl('/logout');
  }

}
