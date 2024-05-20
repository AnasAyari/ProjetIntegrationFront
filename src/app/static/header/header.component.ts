import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  commandsCount = 0;
  user: any;
  private readonly USER_ID_KEY = 'user_id';
  private readonly isAnAdmin = 'admin';

  commandService: any;
  constructor(
    private router: Router,
    private auth: AuthService,
    private userService: UserServiceService
  ) {}
  logedIn = this.auth.isAuthenticated();
  admin = localStorage.getItem(this.isAnAdmin);

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userId = Number(localStorage.getItem(this.USER_ID_KEY));
    if (userId) {
      this.userService.getUserById(userId).subscribe((user) => {
        this.user = user;
      });
    }
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
