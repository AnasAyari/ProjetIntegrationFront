import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  commandsCount = 0;
  private readonly USER_ID_KEY = 'user_id';

  commandService: any;
  constructor(private router: Router, private auth: AuthService) {}
  logedIn = this.auth.isAuthenticated();
  ngOnInit(): void {
   
  }

  

  NavigateTo() {
    this.router.navigate(['form/login']);
  }

  logOut() {
    this.auth.logout();
  }

  navigateToCommand() {
    this.router.navigate(['home/command']);
  }

  showAlert() {
    if (!this.logedIn) {
      alert('you should log in first');
      this.router.navigate(['/home']);
    }
  }
}
